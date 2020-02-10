package com.example.sapoproject.annotation;

import com.example.sapoproject.annotation.valite.Sdt;
import com.example.sapoproject.logic.LogicType;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class SdtValide implements ConstraintValidator<Sdt,String> {
    @Override
    public boolean isValid(String integers, ConstraintValidatorContext constraintValidatorContext) {
        if(integers==null){
            System.err.println("là nlll");
            return true;
        }
        System.out.println();
        if(new LogicType().checkType(integers)){
            System.err.println("là só");
            return false;
        }
        System.err.println("là chữ");
        return true;
    }
}
