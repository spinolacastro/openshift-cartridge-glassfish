#!/bin/sh

DIRNAME=`dirname "$0"`


source $OPENSHIFT_GLASSFISH_DIR/bin/standalone.conf

RUN_CONF="$DIRNAME/standalone.conf"



function _asadmin() {

	. "${OPENSHIFT_GLASSFISH_DIR}/versions/2.1/config/asenv.conf"

	LD_LIBRARY_PATH="$AS_NSS":"$AS_INSTALL/lib":"$AS_ICU_LIB":"$LD_LIBRARY_PATH";export LD_LIBRARY_PATH

	cleanup()
	{
	  stty echo
	  exit 1;
	}

	trap 'cleanup' 1 2 3 9 15

	"$AS_JAVA"/bin/java -Dcom.sun.aas.instanceName=server -Djava.library.path="$AS_NSS":"$AS_INSTALL/lib":"$AS_ICU_LIB" -Dcom.sun.aas.configRoot="$AS_CONFIG" -Djava.endorsed.dirs="$AS_INSTALL/lib/endorsed"	-Dcom.sun.aas.processLauncher="SE" -cp "$AS_DERBY_INSTALL/lib/derby.jar":"$AS_INSTALL/jbi/lib/jbi-admin-cli.jar":"$AS_INSTALL/jbi/lib/jbi-admin-common.jar":"$AS_INSTALL/lib":"$AS_INSTALL/lib/comms-appserv-rt.jar":"$AS_INSTALL/lib/appserv-rt.jar":"$AS_INSTALL/lib/appserv-ext.jar":"$AS_INSTALL/lib/javaee.jar":"$AS_INSTALL/lib/appserv-se.jar":"$AS_INSTALL/lib/comms-appserv-admin-cli.jar":"$AS_INSTALL/lib/admin-cli.jar":"$AS_INSTALL/lib/appserv-admin.jar":"$AS_INSTALL/lib/commons-launcher.jar":"$AS_INSTALL/lib/install/applications/jmsra/imqjmsra.jar" -Dcom.sun.appserv.admin.pluggable.features=com.sun.enterprise.ee.admin.pluggable.EEClientPluggableFeatureImpl com.sun.enterprise.cli.framework.CLIMain "${@}"	

}

function start-domain() {

	if [ -r "$RUN_CONF" ]; then
	    . "$RUN_CONF"
	fi

	_asadmin start-domain

}


function stop-domain() {

	_asadmin stop-domain

}

case "$1" in
  start-domain)         start-domain ;;
  stop-domain)          stop-domain ;;
  *)           exit 0
esac