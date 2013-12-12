#!/bin/sh
# The contents of this file are subject to the terms
# of the Common Development and Distribution License
# (the License).  You may not use this file except in
# compliance with the License.
#
# You can obtain a copy of the license at
# https://glassfish.dev.java.net/public/CDDLv1.0.html or
# glassfish/bootstrap/legal/CDDLv1.0.txt.
# See the License for the specific language governing
# permissions and limitations under the License.
#
# When distributing Covered Code, include this CDDL
# Header Notice in each file and include the License file
# at glassfish/bootstrap/legal/CDDLv1.0.txt.
# If applicable, add the following below the CDDL Header,
# with the fields enclosed by brackets [] replaced by
# you own identifying information:
# "Portions Copyrighted [year] [name of copyright owner]"
#
# Copyright 2006 Sun Microsystems, Inc. All rights reserved.

asDir=<Set value of ${glassfish.home} e.g. /export/tinderbox/dinesh/my814/publish/glassfish>
wsInstanceDir=<Set Sun Webserver installation path to Webserver Instance e.g. /export/tinderbox/dinesh/WebServer/ws6.1/https-iasenglx2.red.iplanet.com>
os=<Platform e.g. solaris/linux>

########################################################################
###Updating magnus.conf file.
update_ws_magnus_conf ( ) {

ws_instance=$1

if [ -f "${ws_instance}/config/magnus.conf" ]
then
 
aslbStr="##BEGIN EE LB Plugin Parameters\\
Init fn=\"load-modules\" shlib=\"${ws_instance}/../plugins/lbplugin/bin/libpassthrough.so\" funcs=\"init-passthrough,service-passthrough,name-trans-passthrough\" Thread=\"no\"\\
Init fn=\"init-passthrough\"\\
##END EE LB Plugin Parameters" 

cd $ws_instance/config
if [ -f "magnus.conf.orig" ]
then
cp magnus.conf.orig magnus.conf
fi

echo "$aslbStr" > aslb.tmp1
echo "s/\//\\\\\\\\\//g" > aslb.tmp1.sed
sed -f aslb.tmp1.sed aslb.tmp1 > aslb.tmp

dirvalue=`cat $ws_instance/config/aslb.tmp`
echo "s/Init fn=\"load-modules\"/$dirvalue\\
Init fn=\"load-modules\"/g" > magnus.conf.sed

sed -f magnus.conf.sed magnus.conf > magnus.conf.tmp

cp magnus.conf magnus.conf.orig
mv magnus.conf.tmp magnus.conf

rm aslb* magnus.conf.sed
fi
}

########################################################################
###Updating obj.conf file.
update_ws_obj_conf ( ) {

ws_instance=$1

if [ -f "${ws_instance}/config/obj.conf" ]
then
 
aslbStr="NameTrans fn=\"name-trans-passthrough\" name=\"lbplugin\" config-file=\"${ws_instance}/config/loadbalancer.xml\""

cd $ws_instance/config
if [ -f "obj.conf.orig" ]
then
cp obj.conf.orig obj.conf
fi

echo "$aslbStr" > aslb1.tmp1
echo "s/\//\\\\\\\\\//g" > aslb1.tmp1.sed
sed -f aslb1.tmp1.sed aslb1.tmp1 > aslb1.tmp

dirvalue=`cat $ws_instance/config/aslb1.tmp`
echo "s/NameTrans fn=\"ntrans-j2ee\"/$dirvalue\\
NameTrans fn=\"ntrans-j2ee\"/g" > obj.conf.sed

sed -f obj.conf.sed obj.conf > obj.conf.tmp

echo "<Object name=\"lbplugin\">
ObjectType fn=\"force-type\" type=\"magnus-internal/lbplugin\"
PathCheck fn=\"deny-existence\" path=\"*/WEB-INF/*\"
Service type=\"magnus-internal/lbplugin\" fn=\"service-passthrough\"
Error reason=\"Bad Gateway\" fn=\"send-error\" uri=\"$docroot/badgateway.html\"
</Object> " >> ${ws_instance}/config/obj.conf.tmp

cp obj.conf obj.conf.orig
mv obj.conf.tmp obj.conf

rm aslb* obj.conf.sed 
fi
}

########################################
mkdir -p ${wsInstanceDir}/../plugins/lbplugin/bin
mkdir -p ${wsInstanceDir}/../plugins/lbplugin/resource
mkdir -p ${wsInstanceDir}/../plugins/lbplugin/errorpages

cp $asDir/lib/lbplugin/lib/webserver-plugin/${os}/iws61/libpassthrough.so ${wsInstanceDir}/../plugins/lbplugin/bin/libpassthrough.so
chmod 755 ${wsInstanceDir}/../plugins/lbplugin/bin/libpassthrough.so 

cp $asDir/lib/lbplugin/lib/webserver-plugin/${os}/iws61/errorpages/default-error.html ${wsInstanceDir}/../plugins/lbplugin/errorpages/default-error.html
cp $asDir/lib/lbplugin/lib/webserver-plugin/${os}/iws61/errorpages/sun-http-lberror.html ${wsInstanceDir}/../plugins/lbplugin/errorpages/sun-http-lberror.html

cp $asDir/lib/lbplugin/lib/webserver-plugin/${os}/iws61/*.res ${wsInstanceDir}/../plugins/lbplugin/resource
cp $asDir/lib/lbplugin/lib/install/templates/loadbalancer.xml.example ${wsInstanceDir}/config/loadbalancer.xml.example
#cp $asDir/lib/lbplugin/lib/dtds/sun-loadbalancer_1_0.dtd ${wsInstanceDir}/config/sun-loadbalancer_1_0.dtd
#cp $asDir/lib/lbplugin/lib/dtds/sun-loadbalancer_1_1.dtd ${wsInstanceDir}/config/sun-loadbalancer_1_1.dtd
cp $asDir/lib/lbplugin/lib/dtds/sun-loadbalancer_1_2.dtd ${wsInstanceDir}/config/sun-loadbalancer_1_2.dtd

cp -r ${wsInstanceDir}/config ${wsInstanceDir}/config.orig
echo "Copying loadbalancer.xml with default cluster settings/application clusterjsp "
cp $asDir/samples/quickstart/clusterjsp/loadbalancer.xml ${wsInstanceDir}/config/loadbalancer.xml

echo "Updating ${wsInstanceDir}/config/magnus.conf file with lbplugin"
update_ws_magnus_conf ${wsInstanceDir}

echo "Updating ${wsInstanceDir}/config/obj.conf file with lbplugin"
update_ws_obj_conf ${wsInstanceDir}

${wsInstanceDir}/stop
echo "Now start webserver to see Clustering/Load Balancing!"
#${wsInstanceDir}/start
