package com.example.sapoproject.converter;

import org.springframework.data.domain.Page;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;

public class MaptoDto {
    public Object getMap(Class o1, Map<String,Object> map) {
        Object o= null;
        try {
            o = o1.getDeclaredConstructor().newInstance();
            Field[] fields=o.getClass().getDeclaredFields();
            Set<String> set=map.keySet();
            for (String s: set){
                String c=removeCharAt(s);
                for (Field field:fields){
                    if(c.toLowerCase().equals(field.getName().toLowerCase())){
                        try {
                            field.setAccessible(true);
                            field.set(o,map.get(s));
                        }catch (Exception e){
                                System.out.println(e.getMessage());
                        }

                    }
                }
            }
            return o;
        } catch (ReflectiveOperationException e) {
            return null;
        }

    }
    public Iterable<?> getMapList(List<Map<String,Object>> maps,Class aClass){
        List<Object> objects=new ArrayList<>();
        for (Map<String,Object> map : maps){

            objects.add(getMap(aClass,map));
        }
        return objects;
    }
    public  String removeCharAt(String s) {
        int pos=s.indexOf("_");
        if (pos==-1){
            return s;
        }
        return s.substring(0, pos) + s.substring(pos + 1);
    }
    public  Page<?> getDto(Page<?> entity, Class dto){
        Page<Object> page=entity.map(new Function<Object, Object>() {
            @Override
            public Object apply(Object o) {
                return getMap(dto, (Map<String, Object>) o);
            }
        });
        return page;}
}
