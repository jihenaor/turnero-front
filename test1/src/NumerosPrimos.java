import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;


class Prime {
    public void checkPrime(int... numbers) {
        for (int number : numbers) {
            if (isPrime(number)) {
                System.out.print(number + " ");
            }
        }
        System.out.println();
    }

    private boolean isPrime(int n) {
        if (n <= 1) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false;
        for (int i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i == 0) return false;
        }
        return true;
    }
}


public class NumerosPrimos {

    public static void main(String[] args) {
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            Prime ob = new Prime();

            int num1 = Integer.parseInt(br.readLine());
            int num2 = Integer.parseInt(br.readLine());
            int num3 = Integer.parseInt(br.readLine());
            int num4 = Integer.parseInt(br.readLine());
            int num5 = Integer.parseInt(br.readLine());

            ob.checkPrime(num1);
            ob.checkPrime(num1, num2);
            ob.checkPrime(num1, num2, num3);
            ob.checkPrime(num1, num2, num3, num4, num5);

        } catch (IOException e) {
            System.out.println(e);
        }
    }
}