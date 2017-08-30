$(function(){
    'use strict';

    window.Validator = function(val, rule){
        // 执行方法
        this.is_valid = function(newVal){
            var key;
            var result;
            if(newVal !== undefined) val = newVal;

            // 如果不是必填项且用户没有输入
            if(!rule.required && !val) return true;

            for(key in rule){
                if(key === 'required') continue;

                // 调用rule中相对应的方法
                result = this['validate_' + key]();
                if(!result) return false;
            }
            return true;
        };

        // 验证是否超过最大数值
        this.validate_max = function(){
            pre_max_min();
            return val <= rule.max;
        };

        // 验证是否小于最小数值
        this.validate_min = function(){
            pre_max_min();
            return val >= rule.min;
        };

        // 验证是否超过最大长度
        this.validate_maxlength = function(){
            pre_length();
            return val.length <= rule.maxlength;
        };

        // 验证是否超过最大长度
        this.validate_minlength = function(){
            pre_length();
            return val.length >= rule.minlength;
        };

        // 验证是否为数字
        this.validate_numeric = function(){
            return $.isNumeric(val);
        };

        // 验证是否为空
        this.validate_required = function(){
            var real = $.trim(val);
            if(!real && real !== 0) return false;
            return true;
        };

        // 验证模式
        this.validate_pattern = function(){
            var reg = new RegExp(rule.pattern);
            return reg.test(val);
        };

        // 用于完成this.validate_max 或 this.validate_min的前置工作
        function pre_max_min(){
            val = parseFloat(val);
        }

        // 用于完成this.validate_maxlength 或 this.validate_minlength的前置工作
        function pre_length(){
            val = val.toString();
        }
    };
})
