variable "bucket" {
  description = "Origin S3 Bucket"
  type = object({
    bucket_regional_domain_name = string,
    arn                         = string,
    id                          = string,
  })
}
