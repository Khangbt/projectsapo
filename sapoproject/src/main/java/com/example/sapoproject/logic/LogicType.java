package com.example.sapoproject.logic;

import java.util.regex.Pattern;

public class LogicType {
        public boolean checkType(String mailOrsdt){
                if(Pattern.matches("[0-9]+", mailOrsdt)){
                    return false;
                }
//            int i=Integer.valueOf(mailOrsdt);
        return true;
        }
        public boolean checkTypeSdt(String mailOrsdt){
                if(Pattern.matches("[0-9]+", mailOrsdt)){
                        return false;
                }
//            int i=Integer.valueOf(mailOrsdt);
                return true;
        }
}
