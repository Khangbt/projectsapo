package com.example.sapoproject.converter;

import java.lang.reflect.Field;

public class DtotoEntity {
    public static Object getDTO(Object oEntity, Object oDto) {
        Field[] fieldDto = oDto.getClass().getDeclaredFields();
        Field[] fieldEntity = oEntity.getClass().getDeclaredFields();
        try {
            for (Field field : fieldDto) {
                field.setAccessible(true);
                Object value = field.get(oDto);
                if (!((value == null) || value.equals(0) || value.equals(""))) {
                    for (Field field1 : fieldEntity){
                        if(field1.getName().equals(field.getName())){
                            field1.setAccessible(true);
                            field1.set(oEntity,value);
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println("Lôi phần get type");
        }

    return oEntity;}
}
