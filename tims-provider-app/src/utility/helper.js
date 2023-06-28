export const Password = {
 
    _pattern : /[a-zA-Z0-9_\-\+\.]/,
    
    
    _getRandomByte : function()
    {
      // http://caniuse.com/#feat=getrandomvalues
      if(window.crypto && window.crypto.getRandomValues) 
      {
        var result = new Uint8Array(1);
        window.crypto.getRandomValues(result);
        return result[0];
      }
      else if(window.msCrypto && window.msCrypto.getRandomValues) 
      {
        var result = new Uint8Array(1);
        window.msCrypto.getRandomValues(result);
        return result[0];
      }
      else
      {
        return Math.floor(Math.random() * 256);
      }
    },
    
    generate : function(length)
    {
      return Array.apply(null, {'length': length})
        .map(function()
        {
          var result;
          while(true) 
          {
            result = String.fromCharCode(this._getRandomByte());
            if(this._pattern.test(result))
            {
              return result;
            }
          }        
        }, this)
        .join('');  
    }    
      
};

export const randomChar= (length) => {
  var date = new Date ().getTime();

    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' + date;
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
   }
   return result;
}

export  const addCommas = (num) =>
num.toString().replace(/\B(?=(\d{10})+(?!\d))/g, " / ");
export const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");