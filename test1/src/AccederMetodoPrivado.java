import java.io.*;
import java.lang.reflect.*;
import java.security.*;

public class AccederMetodoPrivado {

    public static void main(String[] args) throws Exception {
        DoNotTerminate.forbidExit();

        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            int num = Integer.parseInt(br.readLine().trim());
            Object o; // Must be used to hold the reference of the instance of the class Solution.Inner.Private

            // Write your code here
            AccederMetodoPrivado.Inner inner = new AccederMetodoPrivado.Inner(); // Create an instance of Inner
            Class<?> innerClass = inner.getClass(); // Get the Inner class

            // Get the Private class using reflection
            Class<?> privateClass = innerClass.getDeclaredClasses()[0];

            // Set Private class accessible
            Constructor<?> constructor = privateClass.getDeclaredConstructor(innerClass);
            constructor.setAccessible(true);

            // Create an instance of the Private class
            o = constructor.newInstance(inner);

            // Get the powerof2 method and invoke it
            Method powerOf2Method = privateClass.getDeclaredMethod("powerof2", int.class);
            powerOf2Method.setAccessible(true);
            String result = (String) powerOf2Method.invoke(o, num);

            // Print the result
            System.out.println(num + " is " + result);

            System.out.println("An instance of class: " + o.getClass().getCanonicalName() + " has been created");

        } catch (DoNotTerminate.ExitTrappedException e) {
            System.out.println("Unsuccessful Termination!!");
        }
    }

    static class Inner {
        private class Private {
            private String powerof2(int num) {
                return ((num & num - 1) == 0) ? "power of 2" : "not a power of 2";
            }
        }
    }
}

class DoNotTerminate { // This class prevents exit(0)

    public static class ExitTrappedException extends SecurityException {

        private static final long serialVersionUID = 1L;
    }

    public static void forbidExit() {
        final SecurityManager securityManager = new SecurityManager() {
            @Override
            public void checkPermission(Permission permission) {
                if (permission.getName().contains("exitVM")) {
                    throw new ExitTrappedException();
                }
            }
        };
        System.setSecurityManager(securityManager);
    }
}