$(function(){
    var $signup = $('#signup');
    // 选中页面中所有的input[data-rule]
    var $inputs = $('[data-rule]');
    var inputs = [];
    $inputs.each(function(index, item){
        // 解析每一个input的验证规则
        var tmp = new Input(item);
        inputs.push(tmp);
    });

    $signup.on('submit', function(e){
        e.preventDefault();
        $inputs.trigger('blur');
        inputs.forEach(function(item, index){
            var result = item.validator.is_valid();
            if(!result){
                alert('invalid!');
                return;
            }
        });

        signup();
        alert('valid!');
    });

    function signup(){
        // $.post('/api/signup', {
        //
        // })
    }

});
