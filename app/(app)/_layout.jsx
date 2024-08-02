import React from "react";
import { Tabs } from "expo-router";
import TabBars from "../../components/tabBars";


export default function _layout(){
    <Tabs>
        <Tabs.Screen
            name="home"
            options={{
                title: "home",
                header: () => false
            }}
        />
    </Tabs>
}