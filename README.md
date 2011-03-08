Custom Tab Bar
==============

Easily extend tabbar in Appcelerator Titanium mobile for iPhone app to allow any image to be used!

All available settings are shown in the example.

Example
--------

	// Create the tab group
	var tabGroup = Titanium.UI.createTabGroup();

	var win1 = Titanium.UI.createWindow({ title:'Tab 1', height: 440, tabBarHidden: true });
	var tab1 = Titanium.UI.createTab({ 
		icon: 'home.png',
		selectedIcon: 'home_s.png',
		title:'Window 1',
		custom: true, window:win1 
	});
	var win2 = Titanium.UI.createWindow({ title:'Tab 2', height: 440, tabBarHidden: true });
	var tab2 = Titanium.UI.createTab({ 
		icon: 'home.png',
    	title: 'Window 2',
		window:win2 
	});
	tabGroup.addTab(tab1);  
	tabGroup.addTab(tab2);  

	// open tab group
	tabGroup.open();

	// include the new class
	Ti.include("customTabBar.js");

	var ctb = new CustomTabBar({
		tabBar: tabGroup,
	});
	
	//
	// This for loop is OPTIONAL it will allow you to access the new tab bar to hide and show it
	// from within any tab via Ti.UI.currentTab.ctb.hide(); or Ti.UI.currentTab.ctb.show()
	//
	for(i=0; i<tabGroup.tabs.length; i++) {
		tabGroup.tabs[i].ctb = ctb;
	}
	
	setTimeout(function() {
		//int value is the speed that the tab bar will hide
		ctb.hide(400);
	}, 1200);

	setTimeout(function() {
		//int value is the speed that the tab bar will show
		ctb.show(0);
	}, 2800);