#!/usr/bin/env bash
aws-vault --prompt=terminal exec your-project-name  -- /usr/local/bin/terraform init  > >(tee -a .temp) 2> >(tee -a .temp >&2)

if grep -q "Error: NoSuchBucket" ".temp";
then
  rm .temp
  echo "Terraform State bucket does not exist"
  read -p "Whould you like to create one? (Y/N): " confirm
  if [ "$confirm" == "${confirm#[Yy]}" ];
  then
    exit 1
  else
    echo 'Creating bucket...'
    aws-vault --prompt=terminal exec your-project-name  -- aws s3api create-bucket --bucket boilerplate-frontend-terraform --region us-east-2 --create-bucket-configuration LocationConstraint=us-east-2
    echo 'Bucket successfully created'
    ./$(basename $0) && exit
  fi
else
  rm .temp
  echo "Terraform successfully initialized"
fi
