/**
         * Sample applet that executes commandLine
         * JavaScreenPopApplet
         * commandLine (string)
         * executeCommandLine method
         */

import java.io.*;
import java.applet.Applet;
import java.security.AccessController;
import java.security.PrivilegedActionException;
import java.security.PrivilegedExceptionAction;
 
public class JavaScreenPopApplet extends Applet {

		public void init () {
		
		}
 
	   
	    
	   public void executeCommandLine(String commandLine) {
            final String cl = commandLine;
            try {
 
            try {
                AccessController.doPrivileged( 
                    new PrivilegedExceptionAction() {
                    public Object run()  throws  IOException { //RuntimeException,       
                        System.out.println("Started executeCommandLine.");
                        Runtime rt = Runtime.getRuntime();

                        Process pr = rt.exec(cl );

                      
                        return null; 
                    }
                    }
                );
            }
            catch (PrivilegedActionException pae) 
            {
                System.out.println(pae.toString());
                pae.printStackTrace();
            }
 
            } catch(Exception e) {
                System.out.println(e.toString());
                e.printStackTrace();
            }
        }
}