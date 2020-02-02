package com.example.sapoproject.converter;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class MaptoDto {
    public Object getMap(Object o, Map<String,Object> map){
        Field[] fields=o.getClass().getDeclaredFields();
        Set<String> set=map.keySet();
        for (String s: set){
            for (Field field:fields){
                if(s.toLowerCase().equals(field.getName().toLowerCase())){
                    try {
                        field.setAccessible(true);
                        field.set(o,map.get(s));
                    }catch (Exception e){

                    }

                }
            }
        }

        return o;
    }
    public List<Object> getMapList(List<Map<String,Object>> maps){
        List<Object> objects=new ArrayList<>();
                for (Map<String,Object> map : maps){
                    Object o=null;
                    objects.add(getMap(o,map));
                }
    return objects;
    }
}
