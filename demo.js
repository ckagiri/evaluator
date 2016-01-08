(function ($, evaluator) {
    var $panel = $('#expr-panel');
    var $input = $('#expr-input');
    var $submit = $('#expr-submit');
    var $clear = $('#clear-all');

    $('#expr-input').eqInput();
       
    //bind the keys
    $input.keydown(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            $submit.click();
        }
    });

    $submit.click(function () {
        var input = $input.text();
        var result;
        try{
          result = evaluator.eval(input);  
        } catch(ex){
            result = 'Parsing error';
        }
        $('.panel-row').remove();
        render(result);
    });

    $clear.click(function () {
        $input.html('');
        $('.panel-row').remove();
    });

    function render(result) {
        var div = $('<div class="panel-row"></div>'),
            span = $('<span>' + result + '<span>');
        span.appendTo(div);
        $panel.append(div);
    }
})(window.jQuery, window.matheval);