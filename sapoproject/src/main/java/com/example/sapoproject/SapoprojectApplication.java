package com.example.sapoproject;

import com.example.sapoproject.entity.ProductEntity;
import com.example.sapoproject.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class SapoprojectApplication implements CommandLineRunner  {
	@Autowired
	private  ProductRepository pR;
	public static void main(String[] args) {
		SpringApplication.run(SapoprojectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("ssssssssss");
//		ProductEntity p= new ProductEntity();
//		p.setNameProduct("lvh");
//		p.setProductCode("lvh");
//		p.setInventoryNumber(3);
//		p.setPrice(Long.valueOf(20000));
//		System.out.println("lhhh");
//		System.out.println(pR.save(p));
	}
}
