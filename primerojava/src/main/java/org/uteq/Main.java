package org.uteq;

import lombok.Cleanup;
import org.uteq.app.Client;
import org.uteq.util.Status;

import javax.sound.midi.Soundbank;
import java.sql.SQLIntegrityConstraintViolationException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        @Cleanup Scanner sc = new Scanner(System.in);
        String inputText;
        List<Client> clients = new ArrayList<>();

        System.out.println("Hello and welcome!");
        //Creando un cliente con el constructor con todos los parámetros
        Client client = new Client("Gleiston", LocalDate.now(), "gguerrero@uteq.edu.ec", "0999618561", 80.25F, 12, Status.ACTIVE);

        for (int i = 0; i < 2; i++) {
            Client clientTwo = new Client();
            System.out.printf("Nombre: ");
            inputText = sc.nextLine();

            //clientTwo.setName("Gleiston Cicerón");
            clientTwo.setName(inputText);
            System.out.printf("Número de compras: ");
            //inputText = sc.nextLine();
            //clientTwo.setSales(2);

            //clientTwo.setSales(Integer.parseInt(inputText));
            clientTwo.setSales(sc.nextInt());
            System.out.printf("Teléfono: ");
            inputText = sc.nextLine();
            //clientTwo.setPhone("09999999");
            clientTwo.setPhone(inputText);
            System.out.printf("Correo electrónico: ");
            inputText = sc.nextLine();
            //clientTwo.setEmail("gcgu1970510@gmail.com");
            clientTwo.setEmail(inputText);
            System.out.printf("Monto de crédito: ");
            //inputText = sc.nextLine();
            //clientTwo.setCredit(120.36F);
            clientTwo.setCredit(Float.parseFloat(sc.nextLine()));
            System.out.printf("Fecha de nacimiento (AAAA-MM-DD): ");
            inputText = sc.nextLine();
            //clientTwo.setBirthDate(LocalDate.parse("2008-05-15"));
            clientTwo.setBirthDate(LocalDate.parse(inputText));
            System.out.printf("Status: (ACTIVE, INACTIVE, UPDATED):");
            inputText = sc.nextLine();
            clientTwo.setStatus(Status.valueOf(inputText.toUpperCase()));

            //Un cliente ingresado, guardarlo a la lista
            clients.add(clientTwo);
        }
        //System.out.println(client);
        //System.out.println(clientTwo);

        //for (int i = 1; i <= 2; i++) {
        int i = 0;
        for (Client clt : clients) {

            //TIP Press <shortcut actionId="Debug"/> to start debugging your code. We have set one <icon src="AllIcons.Debugger.Db_set_breakpoint"/> breakpoint
            // for you, but you can always add more by pressing <shortcut actionId="ToggleLineBreakpoint"/>.
            System.out.println("Cliente " + (++i) + clt);
        }
    }
}