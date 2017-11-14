package com.boreherbrn;

import com.facebook.react.ReactActivity;
import com.microsoft.codepush.react.CodePush;
import com.boreherbrn.BuildConfig;

public class MainActivity extends ReactActivity {

    @Override
    protected String getJSBundleFile(){
        return CodePush.getBundleUrl():
    }

    @Override
    protected List<ReactPackage> getPackages(){
        return Arrays.<ReactPackage> as List(
            new MainReactPackage(),
            new CodePush(BuildConfig.CODEPUSH_KEY , this , BuildCofig.DEBUG)
        )
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "BoreHerbRn";
    }
}
