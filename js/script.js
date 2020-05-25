$(function(){
    const signSelect =  $('#sign')
    //星座のリスト
    signs = ["牡羊座", "牡牛座", "双子座", "蟹座", "獅子座", "乙女座", "天秤座", "蠍座", "射手座", "山羊座", "水瓶座", "魚座"]
    signs.forEach(function(value){
        signSelect.append($('<option>').html(value).val(value))
    })

    let seletedSign
    //占うボタンがクリックされたら
    $('#btnSelectSign').on('click', function(){
        //前回の表示を削除
        $('#horoscopeContent').children().remove()
        //選択されたデータを取得
        seletedSign = $('#sign option:selected').val()
        console.log(seletedSign)
        //ajaxでデータを取得
        $.ajax({
            type: 'GET',
            url: 'data.php',
            dataType: 'json',
            success: function(json){
                //占った日
                const currentdate = Object.keys(json.horoscope)[0]
                //表示する占い
                const horoscopes = json.horoscope[currentdate]
                const horoscope = horoscopes.filter(function(value, index){
                    if(value.sign === seletedSign) return true
                })
                console.log(horoscope)
                //cardを更新
                //タイトルを設定
                $('#horoscopeTitle').text(currentdate+'の運勢')
                //画像を取得
                imageName = wordToImage(seletedSign)
                $('#horoscopeImg').attr('src',imageName)
                //項目を追加
                const horoscopeArr = new Array()
                horoscopeArr.push("運勢:"+ horoscope[0].content)
                horoscopeArr.push("ラッキーアイテム:"+ horoscope[0].item)
                horoscopeArr.push("ラッキーカラー:"+ horoscope[0].color)
                
                horoscopeArr.forEach(function(value){
                    $('#horoscopeContent').append($('<li>').text(value))
                })
            }
        })
    })

    //星座名から画像名を取得
    function wordToImage(word){
        let imageName = '';
        switch(word){
            case "牡羊座":
                imageName = "aries";
                break;
            case "牡牛座":
                imageName = "taurus";
                break;
            case "双子座":
                imageName = "gemini";
                break;
            case "蟹座":
                imageName = "cancer";
                break;
            case "獅子座":
                imageName = "leo";
                break;
            case "乙女座":
                imageName = "virgo";
                break;
            case "天秤座":
                imageName = "libra";
                break;
            case "蠍座":
                imageName = "scorpio";
                break;
            case "射手座":
                imageName = "sagittarus";
                break;
            case "山羊座":
                imageName = "capricorn";
                break;
            case "水瓶座":
                imageName = "aquarius";
                break;
            case "魚座":
                imageName = "pisces";
                break;
                
            default:

        }
        return "./images/"+imageName+".png";
    }
});