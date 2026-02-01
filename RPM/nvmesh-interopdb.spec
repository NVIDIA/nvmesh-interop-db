Name:				nvmesh-interopdb
Version:			%{version}
Release:			%{release}
Summary:			"nvmesh-interopdb" by NVIDIA

License:			Apache-2.0
URL:				http://www.nvidia.com
Source0:			%{name}

%description

Copyright (c) 2026 NVIDIA CORPORATION & AFFILIATES. All rights reserved.

"NVIDIA" InteropDB SQLite Database
        Branch: %{branch}
        Commit: %{commit_id}
        ChangeId: %{change_id}


%pre
GROUP=excelero
USER=excelero

id -u $USER >/dev/null 2>&1
retVal=$?

if ! grep -q "^${GROUP}:" /etc/group ; then
	groupadd $GROUP
fi

if [ $retVal -ne 0 ]; then
	echo "Creating user $USER"
	useradd -g $GROUP $USER
else
	usermod -G $GROUP $USER
fi

%prep
cp -rfv %{_sourcedir}/%{name} %{_builddir}/

%build
sqlite3 %{_builddir}/%{name}/InteropDB < %{_builddir}/%{name}/InteropDB.dump.sql

%install
mkdir -pv %{buildroot}/opt/nvmesh/interop-db
cp %{_builddir}/%{name}/InteropDB %{buildroot}/opt/nvmesh/interop-db/InteropDB
echo "version=\"%{version}-%{release}\"" > %{buildroot}/opt/nvmesh/interop-db/version
echo "commit=\"%{commit_id}\"" >> %{buildroot}/opt/nvmesh/interop-db/version
echo "changeID=\"%{change_id}\"" >> %{buildroot}/opt/nvmesh/interop-db/version
echo "branch=\"%{branch}\"" >> %{buildroot}/opt/nvmesh/interop-db/version

%files
%attr(-, excelero, excelero) /opt/nvmesh/interop-db/InteropDB
/opt/nvmesh/interop-db/version

%changelog
* Mon Jul 21 2025 Nvidia Corporation
- Installing Nvidia nvmesh-interopdb
