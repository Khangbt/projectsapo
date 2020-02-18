package com.example.sapoproject.annotation.valite;


import com.example.sapoproject.annotation.SdtValide;
import com.example.sapoproject.annotation.SizeList;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
@Retention(RUNTIME)
@Repeatable(SizeL.List.class)
@Constraint(validatedBy = SizeList.class)
@Documented
public @interface SizeL {
    String message() default "số điện thoại chứ kí tự ";
    int size() default 10;
    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
    @Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    @interface List {
        SizeL[] value();
    }
}
