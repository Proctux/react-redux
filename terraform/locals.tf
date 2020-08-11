locals {
   env = {
      default = {
         project = "boilerplate"
      }
      staging = {
         alias  = ["staging-boilerplate.jungledevs.com"]
         arn = "arn:aws:acm:us-east-1:880104517457:certificate/dde4ea10-479e-489a-8b19-f8dde43cb6a8"
      }
      production = {
         alias  = "boilerplate.jungledevs.com"
         arn = "arn:aws:acm:us-east-1:880104517457:certificate/dde4ea10-479e-489a-8b19-f8dde43cb6a8"
      }
   }
   environmentvars = "${contains(keys(local.env), terraform.workspace) ? terraform.workspace : "default"}"
   workspace       = "${merge(local.env["default"], local.env[local.environmentvars])}"
}
