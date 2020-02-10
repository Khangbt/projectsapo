package com.example.sapoproject.annotation;

import com.example.sapoproject.annotation.valite.Sdt;
import com.example.sapoproject.logic.LogicType;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class SdtValide implements ConstraintValidator<Sdt,Integer> {
    @Override
    public boolean isValid(Integer integers, ConstraintValidatorContext constraintValidatorContext) {
        if(integers==null){
            System.err.println("là nlll");
            return true;
        }
        if((integers<1000000000)&&(integers>10000000)){
            return true;
        }
        return false;
    }
}
