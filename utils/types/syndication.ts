export interface TweetSyndication {
  lang: string
  favorite_count: number
  self_thread: SelfThread
  created_at: string
  display_text_range: number[]
  entities: Entities
  id_str: string
  text: string
  user: User
  conversation_count: number
  news_action_type: string
  card: Card
  photos: Photo[]
  video: Video
  quoted_tweet: QuotedTweet
}

export interface ImageValue {
  height: number
  width: number
  url: string
}

export interface SelfThread {
  id_str: string
}

export interface Entities {
  hashtags: HashTag[]
  urls: Url[]
  media: Url[]
  user_mentions: UserMention[]
  symbols: any[]
}

export interface Url {
  display_url: string
  expanded_url: string
  indices: number[]
  url: string
}

export interface HashTag {
  indices: number[]
  text: string
}

export interface UserMention {
  id_str: string
  indices: number[]
  name: string
  screen_name: string
}

export interface User {
  id_str: string
  name: string
  profile_image_url_https: string
  screen_name: string
  verified: boolean
}

export interface Card {
  card_platform: CardPlatform
  name: string
  url: string
  binding_values: BindingValues
}

export interface CardPlatform {
  platform: Platform
}

export interface Platform {
  audience: Audience
  device: Device
}

export interface Audience {
  name: string
}

export interface Device {
  name: string
  version: string
}

export interface BindingValues {
  photo_image_full_size_large: PhotoImageFullSizeLarge
  thumbnail_image: ThumbnailImage
  description: Description
  domain: Domain
  thumbnail_image_large: ThumbnailImageLarge
  summary_photo_image_small: SummaryPhotoImageSmall
  thumbnail_image_original: ThumbnailImageOriginal
  site: Site
  photo_image_full_size_small: PhotoImageFullSizeSmall
  summary_photo_image_large: SummaryPhotoImageLarge
  thumbnail_image_small: ThumbnailImageSmall
  thumbnail_image_x_large: ThumbnailImageXLarge
  photo_image_full_size_original: PhotoImageFullSizeOriginal
  vanity_url: VanityUrl
  photo_image_full_size: PhotoImageFullSize
  thumbnail_image_color: ThumbnailImageColor
  title: Title
  summary_photo_image_color: SummaryPhotoImageColor
  summary_photo_image_x_large: SummaryPhotoImageXLarge
  summary_photo_image: SummaryPhotoImage
  photo_image_full_size_color: PhotoImageFullSizeColor
  photo_image_full_size_x_large: PhotoImageFullSizeXLarge
  card_url: CardUrl
  summary_photo_image_original: SummaryPhotoImageOriginal
}

export interface PhotoImageFullSizeLarge {
  image_value: ImageValue
  type: string
}

export interface ThumbnailImage {
  image_value: ImageValue
  type: string
}

export interface Description {
  string_value: string
  type: string
}

export interface Domain {
  string_value: string
  type: string
}

export interface ThumbnailImageLarge {
  image_value: ImageValue
  type: string
}

export interface SummaryPhotoImageSmall {
  image_value: ImageValue
  type: string
}

export interface ThumbnailImageOriginal {
  image_value: ImageValue
  type: string
}

export interface Site {
  scribe_key: string
  type: string
  user_value: UserValue
}

export interface UserValue {
  id_str: string
  path: any[]
}

export interface PhotoImageFullSizeSmall {
  image_value: ImageValue
  type: string
}

export interface SummaryPhotoImageLarge {
  image_value: ImageValue
  type: string
}

export interface ThumbnailImageSmall {
  image_value: ImageValue
  type: string
}

export interface ThumbnailImageXLarge {
  image_value: ImageValue
  type: string
}

export interface PhotoImageFullSizeOriginal {
  image_value: ImageValue
  type: string
}

export interface VanityUrl {
  scribe_key: string
  string_value: string
  type: string
}

export interface PhotoImageFullSize {
  image_value: ImageValue
  type: string
}

export interface ThumbnailImageColor {
  image_color_value: ImageColorValue
  type: string
}

export interface ImageColorValue {
  palette: Palette[]
}

export interface Title {
  string_value: string
  type: string
}

export interface SummaryPhotoImageColor {
  image_color_value: ImageColorValue
  type: string
}

export interface SummaryPhotoImageXLarge {
  image_value: ImageValue
  type: string
}

export interface SummaryPhotoImage {
  image_value: ImageValue
  type: string
}

export interface PhotoImageFullSizeColor {
  image_color_value: ImageColorValue
  type: string
}

export interface Palette {
  rgb: Rgb
  percentage: number
}

export interface Rgb {
  blue: number
  green: number
  red: number
}

export interface PhotoImageFullSizeXLarge {
  image_value: ImageValue
  type: string
}

export interface CardUrl {
  scribe_key: string
  string_value: string
  type: string
}

export interface SummaryPhotoImageOriginal {
  image_value: ImageValue
  type: string
}

export interface QuotedTweet {
  lang: string
  reply_count: number
  retweet_count: number
  favorite_count: number
  created_at: string
  display_text_range: number[]
  entities: Entities
  id_str: string
  text: string
  user: User
  photos: Photo[]
}

export interface Photo {
  backgroundColor: BackgroundColor
  cropCandidates: CropCandidate[]
  expandedUrl: string
  url: string
  width: number
  height: number
}

export interface BackgroundColor {
  red: number
  green: number
  blue: number
}

export interface CropCandidate {
  x: number
  y: number
  w: number
  h: number
}

export interface Video {
  aspectRatio: number[]
  contentType: string
  durationMs: number
  mediaAvailability: MediaAvailability
  poster: string
  variants: Variant[]
  videoId: VideoId
  viewCount: number
}

export interface MediaAvailability {
  status: string
}

export interface Variant {
  type: string
  src: string
}

export interface VideoId {
  type: string
  id: string
}
