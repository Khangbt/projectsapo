package com.example.sapoproject.logic;

import java.lang.reflect.Field;

public class GetEntityOrDto {
    public Class getDto(Class entityClass,Class dtoClass){
        Field[] fieldDto=dtoClass.getDeclaredFields();
        Field[] fieldsEntity=entityClass.getDeclaredFields();
        for (Field field: fieldDto){
            for (Field fieldEntity :fieldsEntity){
                if(field.getName().equals(fieldEntity.getName())){
                    field.setAccessible(true);

                }
            }
        }
    return null;}
}
