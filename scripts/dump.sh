#!/bin/bash

DIR=~/projects/interop-db/
DB_FILE="$DIR/InteropDB"
DUMP_FILE="$DIR/InteropDB.dump.sql"

# List of tables with auto-incrementing primary keys.
TABLES=(
    ArchType
    ArtifactPlatform
    Artifact
    Component
    ComponentCompatibility
    ComponentRequirement
    ComponentType
    ComponentVersion
    ComponentVersionPlatform
    DistributionType
    Kernel
    Ofed
    OperatingSystem
    Platform
    Release
    ReleaseArtifact
    Upgrade
    UpgradeStep
    UpgradeToUpgradeStep
    UpgradeType
)

echo "Resetting sequences on the live database: $DB_FILE"

# Generate and execute the full SQL script to reset sequences for all tables
{
    echo "BEGIN TRANSACTION;"
    for table in "${TABLES[@]}"; do
        echo "DELETE FROM sqlite_sequence WHERE name = '$table';"
        echo "INSERT INTO sqlite_sequence (name, seq) SELECT '$table', COALESCE(MAX(id), 0) FROM $table;"
    done
    echo "COMMIT;"
} | sqlite3 "$DB_FILE"

echo "Sequences reset successfully."

echo "Dumping database to $DUMP_FILE..."
sqlite3 "$DB_FILE" .dump > "$DUMP_FILE"

echo "Database dump complete."