#!/bin/bash

# SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
# SPDX-License-Identifier: Apache-2.0

DIR=~/projects/interop-db/

sqlite3 $DIR/InteropDB < $DIR/InteropDB.dump.sql
