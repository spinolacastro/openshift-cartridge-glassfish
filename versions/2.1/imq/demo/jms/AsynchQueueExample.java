/*
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
 *
 * Copyright 2000-2008 Sun Microsystems, Inc. All rights reserved. 
 *
 * The contents of this file are subject to the terms of either the GNU
 * General Public License Version 2 only ("GPL") or the Common Development
 * and Distribution License ("CDDL") (collectively, the "License").  You may
 * not use this file except in compliance with the License.  You can obtain
 * a copy of the License at https://glassfish.dev.java.net/public/CDDL+GPL.html
 * or mq/legal/LICENSE.txt.  See the License for the specific language
 * governing permissions and limitations under the License.
 * 
 * When distributing the software, include this License Header Notice in each
 * file and include the License file at mq/legal/LICENSE.txt.  Sun designates
 * this particular file as subject to the "Classpath" exception as provided by
 * Sun in the GPL Version 2 section of the License file that accompanied this
 * code.  If applicable, add the following below the License Header, with the
 * fields enclosed by brackets [] replaced by your own identifying information:
 * "Portions Copyrighted [year] [name of copyright owner]"
 * 
 * Contributor(s):
 * 
 * If you wish your version of this file to be governed by only the CDDL or
 * only the GPL Version 2, indicate your decision by adding "[Contributor]
 * elects to include this software in this distribution under the [CDDL or GPL
 * Version 2] license."  If you don't indicate a single choice of license, a
 * recipient has the option to distribute your version of this file under
 * either the CDDL, the GPL Version 2 or  to extend the choice of license to
 * its licensees as provided above.  However, if you add GPL Version 2 code
 * and therefore, elected the GPL Version 2 license, then the option applies
 * only if the new code is made subject to such option by the copyright holder. 
 */

/*
 * @(#)AsynchQueueExample.java	1.7 07/02/07
 */ 

import javax.jms.*;

/**
 * The AsynchQueueExample class consists only of a main method, which fetches 
 * one or more messages from a queue using asynchronous message delivery.
 * <p>
 * Compile TextListener.java before you run this program.
 * <p>
 * Run this program in conjunction with SenderToQueue.  Specify a queue name
 * on the command line when you run the program.
 */
public class AsynchQueueExample {

    /**
     * Main method.
     *
     * @param args	the queue used by the example
     */
    public static void main(String[] args) {
        String               queueName = null;
        ConnectionFactory    connectionFactory = null;
        Connection           connection = null;
        Session              session = null;
        Queue                queue = null;
        MessageConsumer      msgConsumer = null;
        TextListener         textListener = null;
        int                  exitResult = 0;
        
    	if (args.length != 1) {
    	    System.out.println("Usage: java AsynchQueueExample <queue_name>");
    	    System.exit(1);
    	}   	
        queueName = new String(args[0]);
        System.out.println("Queue name is " + queueName);
    	    
        try {
            connectionFactory = 
                SampleUtilities.getConnectionFactory();
            connection = 
                connectionFactory.createConnection();
            session = connection.createSession(false, 
                Session.AUTO_ACKNOWLEDGE);
            queue = SampleUtilities.getQueue(queueName, session);
        } catch (Exception e) {
            System.out.println("Connection problem: " + e.toString());
            if (connection != null) {
                try {
                    connection.close();
                } catch (JMSException ee) {}
            }
    	    System.exit(1);
        } 

        /*
         * Create consumer.
         * Register message listener (TextListener).
         * Start message delivery; listener displays the message obtained.
         * Block until producer issues a control message indicating
         * end of publish stream.
         */
        try {
            msgConsumer = session.createConsumer(queue);
            textListener = new TextListener();
            msgConsumer.setMessageListener(textListener);
            connection.start();
            
            textListener.monitor.waitTillDone();
        } catch (JMSException e) {
            System.out.println("Exception occurred: " + e.toString());
            exitResult = 1;
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (JMSException e) {
                    exitResult = 1;
                }
            }
        }
        SampleUtilities.exit(exitResult);
    }
}
