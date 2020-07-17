provider "aws" {
  region  = "us-east-2"
  version = "~> 2.69"
}

module "s3" {
  source = "./S3"
}

module "cloudfront" {
  source = "./CloudFront"
  bucket = module.s3.bucket
}
