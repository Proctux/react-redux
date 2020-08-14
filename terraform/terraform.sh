#!/usr/bin/env bash
aws-vault --prompt=terminal exec your-project-name -- /usr/local/bin/terraform $@
