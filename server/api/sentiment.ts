import loadTf from "tensorflow-lambda"
import { supabase } from "../_lib/supabase"
import tfMetaData from "../_lib/tfjs/metadata.json"

let tfModel
let tf

export default defineEventHandler(async (event) => {
  const { id, text } = useQuery(event)
  try {
    // const { data } = await supabase.from("tweets").select("*").eq("id", id)
    tf = await loadTf()
    if (tfModel == undefined) {
      tfModel = await tf.loadLayersModel("https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json")
    }

    const score = getSentimentScore(text.toString())
    return {
      score,
    }
  } catch (err) {
    event.res.statusCode = 400
    return { err }
  }
})

function padSequences(sequences: string[][], maxLen: number, padding = "pre", truncating = "pre", value = 0) {
  return sequences.map((seq) => {
    if (seq.length > maxLen) {
      if (truncating === "pre") {
        seq.splice(0, seq.length - maxLen)
      } else {
        seq.splice(maxLen, seq.length - maxLen)
      }
    }

    if (seq.length < maxLen) {
      const pad = []
      for (let i = 0; i < maxLen - seq.length; ++i) {
        pad.push(value)
      }
      if (padding === "pre") {
        seq = pad.concat(seq)
      } else {
        seq = seq.concat(pad)
      }
    }

    return seq
  })
}

function getSentimentScore(text: string) {
  const inputText = text
    .trim()
    .toLowerCase()
    .replace(/(\.|\,|\!)/g, "")
    .split(" ")
  // Convert the words to a sequence of word indices.
  const sequence = inputText.map((word: string) => {
    let wordIndex = tfMetaData.word_index[word] + tfMetaData.index_from
    if (wordIndex > tfMetaData.vocabulary_size) {
      wordIndex = 2
    }
    return wordIndex
  })
  // Perform truncation and padding.
  const paddedSequence = padSequences([sequence], tfMetaData.max_len)
  const input = tf.tensor2d(paddedSequence, [1, tfMetaData.max_len])

  const predictOut = tfModel.predict(input)
  const score = predictOut.dataSync()[0]
  predictOut.dispose()

  return score
}
