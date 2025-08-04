#!/bin/bash

DIR=~/projects/interop-db/

sqlite3 $DIR/InteropDB .dump > $DIR/InteropDB.dump.sql