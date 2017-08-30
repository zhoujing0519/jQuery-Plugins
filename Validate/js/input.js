$(function(){
    'use strict';

    window.Input = function(selector){
        var $ele = undefined;
        var rule = {required: true};
        var self = this;
        var $error_ele = undefined;

        // 加载验证器
        this.load_validator = function(){
            var val = this.get_val();
            this.validator = new Validator(val, rule);
        };

        // 获取input的value
        this.get_val = function(){
            return $ele.val();
        };

        // 初始化
        function init(){
            find_ele();
            get_error_ele();
            parse_rule();
            self.load_validator();
            listen();
        }

        // 获取DOM对象
        function find_ele(){
            if(selector instanceof jQuery){
                $ele = selector;
            }else{
                $ele = $(selector);
            }
        }

        // 解析规则
        function parse_rule(){
            var rule_str = $ele.data('rule'); // pattern:"^[a-z0-9]$"|maxlength:10|minlength:2|nullable:false|numeric:false
            if(!rule_str) return;

            var rule_arr = rule_str.split('|'); // ['pattern:"^[a-z0-9]$"', 'maxlength:10', ...]
            var i = 0;
            var l = rule_arr.length;
            var item_str = '';
            var item_arr = [];
            for(; i < l; i++){
                item_str = rule_arr[i]; // 'pattern:"^[a-z0-9]$"'
                item_arr = item_str.split(':'); // ['pattern', '"^[a-z0-9]$"']
                rule[item_arr[0]] = JSON.parse(item_arr[1]); // {pattern: "^[a-z0-9]$"}
            }
        }

        // 监听事件
        function listen(){
            $ele.on('blur', function(){
                var valid = self.validator.is_valid(self.get_val());
                if(valid){
                    $error_ele.hide();
                }else{
                    $error_ele.show();
                }
            });
        }

        // 获取input-error选择器
        function get_error_selector(){
            return '#' + $ele.attr('name') + '-input-error';
        }

        // 获取input-errorDOM
        function get_error_ele(){
            $error_ele = $(get_error_selector());
        }

        init();
    };
})
