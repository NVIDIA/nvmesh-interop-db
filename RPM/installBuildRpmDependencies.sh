#!/bin/bash -x

# SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
# SPDX-License-Identifier: Apache-2.0

if [ "$EUID" -ne 0 ]; then
	echo "Error: should be run as root"
	exit 1
fi

. ./buildrpm_dependencies.env

if [ -z "$BUILDRPM_DEPENDENCIES" ]; then
	echo "Error: BUILDRPM_DEPENDENCIES environment variable is not set or empty"
	return 1
fi

if [ -e /etc/redhat-release ]; then
	yum install -y $YUM_INSTALL_FLAGS $BUILDRPM_DEPENDENCIES
elif [[ "$(cat /etc/os-release 2>/dev/null)" =~ Ubuntu ]]; then
	apt update
	DEBIAN_FRONTEND=noninteractive apt install -y $BUILDRPM_DEPENDENCIES
else
	echo "Error: Unsupported OS type (neither RedHat nor Ubuntu detected)"
	exit 1
fi
