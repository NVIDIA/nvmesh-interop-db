#!/bin/bash

usage() {
	echo "Usage: $0"
	echo "BUILDRPM_FLAGS='' can be used to provide buildrpm script special flags"
	echo "YUM_INSTALL_FLAGS='' can be used to provide yum install special flags"
	exit 1
}

if [ "$EUID" -ne 0 ]; then
	echo "Error: should be run as root"
	exit 1
fi

current_dir="$(pwd)"
dir_name="$(basename "$current_dir")"

if [ "$dir_name" != "RPM" ]; then
	echo "Error: running from is '$current_dir', but should be in 'RPM'."
	exit 1
fi

log_dir=${LOGD:-$(mktemp -d /tmp/interopdb_build_sh.XXXXXX)}

run_command_with_log() {
	local log_file="${log_dir}/$1"
	shift
	local command="$*"

	echo -n "Executing: $command"
	TIMEFORMAT='%3R'
	time_taken=$( { time bash -c "set -x; $command" &> "$log_file"; } 2>&1)
	local exit_status=$?
	echo " -- ${time_taken}s"

	if [[ $exit_status -ne 0 ]]; then
		echo "Command failed: $command"
		echo "Check log file: $log_file"
		exit $exit_status
	fi
}

while [[ "$#" -gt 0 ]]; do
	case $1 in
		*)
			echo "Error: Invalid argument $1"
			usage
			;;
	esac
done


run_command_with_log "installBuildRpmDependencies.log"	./installBuildRpmDependencies.sh
run_command_with_log "buildrpm.log" 					./buildrpm $BUILDRPM_FLAGS