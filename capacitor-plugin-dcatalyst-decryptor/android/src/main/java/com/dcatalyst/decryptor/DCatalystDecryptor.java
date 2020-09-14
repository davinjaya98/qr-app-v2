package com.dcatalyst.decryptor;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

//Dcatalyst Library
import com.dcatalyst.encryptor.Handler;

//Android Library
import android.util.Base64;

@NativePlugin
public class DCatalystDecryptor extends Plugin {

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.success(ret);
    }

    @PluginMethod
    public void decrypt(PluginCall call) {
        String data = call.getString("data");
        
        String result = "empty";
        try {
            result = Handler.decryptStr(Base64.decode(data.getBytes(), Base64.URL_SAFE),false).getStr();
        }catch(Exception e) {
            result = e.toString();
        }

        JSObject ret = new JSObject();
        ret.put("result", result);
        ret.put("input data", data);

        call.success(ret);
    }
}
