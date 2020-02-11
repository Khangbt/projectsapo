package com.example.sapoproject.converter;

import com.example.sapoproject.logic.LogicType;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.*;

public class Convent<T> {
    public Object checkType(Map<String, ?> map, Class aClass){
        Map<String,String> list=new HashMap<>();
        Field[] fields = aClass.getDeclaredFields();
        Set<String> set = map.keySet();
        for (String key : set) {
            for (Field field : fields) {
                if (key.equalsIgnoreCase(field.getName())) {
                    if ((map.get(key) instanceof String) && (field.getType().isAssignableFrom(String.class))) {
                        //   System.out.println("sậiasjiasjdisad");

                    } else if ((map.get(key) instanceof Integer) &&
                            ((field.getType().isAssignableFrom(Integer.class))||(field.getType().isAssignableFrom(int.class)))) {
                        //     System.out.println("dm đây là số");
//                        System.out.println(field.getName());
                    }else if ((map.get(key) instanceof List) && (isCollection(field.getType()))) {
//                                    System.out.println("đây la mang");
                    }else if(!(new LogicType().checkType((map.get(key)).toString()))  &&
                            ((field.getType().isAssignableFrom(Long.class))||(field.getType().isAssignableFrom(int.class)))){
                                System.out.println("đây la long");
                                System.out.println(field.getName());
                    }
                    else {
                        list.put( key,"Lỗi kiểu dữ liệu của trường này");
                        //  System.out.println("lỗi kiểu dữ liệu ở trường" + key);
                    }
                }
            }
        }
        if(list.isEmpty()){
            return 0;
        }
        return list;
    }
    public Object mapToDto( Map<String, Object> map,Class o1) {
        Object list= checkType(map,o1);
        if(list.getClass().isAssignableFrom(HashMap.class)){
            System.out.println("vao day11");
            return list;
        }
        Object o = null;
        try {
            o = o1.getDeclaredConstructor().newInstance();
            Field[] fields = o.getClass().getDeclaredFields();
            Set<String> set = map.keySet();
            for (String s : set) {
                for (Field field : fields) {
                    if (s.toLowerCase().equals(field.getName().toLowerCase())) {
                        try {
                            field.setAccessible(true);
                            if((field.getType().isAssignableFrom(Long.class))){
                                field.set(o,Long.valueOf( map.get(s).toString()));
                                System.out.println(map.get(s));
                                System.out.println(field.getName());
                            }
                            field.set(o,map.get(s));
                        } catch (Exception e) {

                        }

                    }
                }
            }

            return o;
        } catch (ReflectiveOperationException e) {
            return null;
        }

    }

    public Object dtoForm(Map<String, Object> map1,Class o1) {
        Object t1= mapToDto( map1,o1);
        if(t1.getClass().isAssignableFrom(HashMap.class)){
            return t1;
        }
        T t=(T) t1;

        Map<String,String> map=new HashMap<>();
        ValidatorFactory validatorFactory= Validation.buildDefaultValidatorFactory();
        Validator validator=validatorFactory.getValidator();
        Set<ConstraintViolation<T>> set=validator.validate(t);
        for (ConstraintViolation<T> violation : set) {
            map.put(violation.getPropertyPath().toString(),violation.getMessage());
        }
        if (map.isEmpty()){
            return t;
        }

        return map;
    }

    public Object dtoToEntity(Class oE,Map<String, Object> map1,Class zclasDto) {
        Object list= dtoForm(map1,zclasDto);

        if(list.getClass().isAssignableFrom(HashMap.class)){
            System.out.println("vaoo day");
            return list;
        }
        Object oDto=list;
        Object oEntity=null;
        Field[] fieldDto = oDto.getClass().getDeclaredFields();
        Field[] fieldEntity = oE.getDeclaredFields();
        try {
            oEntity=oE.getDeclaredConstructor().newInstance();
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


        return oEntity;
    }
    public  boolean isCollection(Class<?> rawPropertyType) {
        return Collection.class.isAssignableFrom(rawPropertyType) ||
                Map.class.isAssignableFrom(rawPropertyType) ||
                rawPropertyType.isArray()||rawPropertyType.getName().startsWith("[L");
    }

}
