package app;

import model.Customer;
import model.Product;

public class App {

    public static void main(String[] args) {
        Product p1 = new Product(1, "TV", 99);
        Product p2 = new Product(1, "TVx", 59);

        System.out.println(p1.equals(p2));

        //Customer c1 = new Customer(1, null, true);
        Customer.CustomerBuilder c1 = Customer.builder().idCustomer(1).isActive(true);

        if(3 > 5){
            c1.name("UTEQ");
        }else{
            c1.name("DEFAULT");
        }


        System.out.println(c1.build());
    }
}
