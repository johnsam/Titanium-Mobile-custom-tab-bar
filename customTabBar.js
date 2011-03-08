CustomTabBar = function(settings) {
	
	//tabGroup -- Required that the user set this!!!
    settings.width     = (typeof settings.width == 'undefined')     ? 64 : settings.width; //64 is default for 5 icons, w/equal share
    settings.height    = (typeof settings.height == 'undefined')    ? 40 : settings.height;

	var tabBarItems = [];
	var defaultImages = [];
	
	var defineSettings = function() {
		// watch the tab for change
		assignClick(settings.tabBar);
		for(var i = 0; i < settings.tabBar.tabs.length; i++) 
		{			
			var iconWidth = settings.tabBar.tabs[i].iconWidth == undefined ? 320 / settings.tabBar.tabs.length : settings.tabBar.tabs[i+1].width; 
		    var iconHeight = settings.tabBar.tabs[i].iconHeight == undefined ? 40 : settings.tabBar.tabs[i+1].height;

			defaultImages[i] = settings.tabBar.tabs[i].icon;

			var pos = i;
			
			// Go through each item and create an imageView
            tabBarItems[i] = Titanium.UI.createImageView({
                width: iconWidth,
                height: iconHeight,
				top: -8,
                left: (320 / settings.tabBar.tabs.length) * pos
            });
			
			if(settings.tabBar.tabs[i].custom != undefined)
			{
				// image is the default image
            	tabBarItems[i].image = settings.tabBar.tabs[i].icon;
				
				// clear out the default to prevent some odd coloring
				settings.tabBar.tabs[i].icon = null;
			} 
			else 
			{
				tabBarItems[i].image = 'clear.png';
			}

            // Pass the item number (used later for changing tabs)
            tabBarItems[i].pos = i;
			
            // Add to the container window
            customTabBar.add(tabBarItems[i]);
		}
	};
	
	var assignClick = function(tabGroup) {
		tabGroup.addEventListener('focus', function(e) {

			var pos = e.index;

			for(var i = 0; i < settings.tabBar.tabs.length; i++) 
			{
				if(settings.tabBar.tabs[i].custom != undefined)
				{
					// image is the selected image
	            	tabBarItems[i].image = defaultImages[i];
				}
			}
			
			if(settings.tabBar.tabs[pos] != undefined && settings.tabBar.tabs[pos].selectedIcon != undefined) {
				tabBarItems[pos].image = settings.tabBar.tabs[pos].selectedIcon;
			}
		});
	};
	
	// Create the container for our tab items
	var customTabBar = Ti.UI.createWindow({
		height: settings.height,
		bottom: 0,
		touchEnabled: false
	});

	var slideOut = function(speed) {
		
		speed = speed || 300;
		
		var hideAnimation = Titanium.UI.createAnimation({
		    bottom: -50,
		    duration: speed
		});
        customTabBar.animate(hideAnimation);
		settings.tabBar.animate(hideAnimation);
	};
	
	var slideIn = function(speed) {
		
		speed = speed || 300;
		
		var showAnimation = Titanium.UI.createAnimation({
		    bottom: 0,
		    duration: speed
		});
        customTabBar.animate(showAnimation);
		settings.tabBar.animate(showAnimation);
	};

	// Display the container and it's items
	customTabBar.open();

	// Set the first item as current :)
	defineSettings();
	if(settings.tabBar.tabs[0].custom != undefined)
	{
		tabBarItems[0].image = settings.tabBar.tabs[0].selectedIcon;
	}
	
	return {
		hide: function(speed) { slideOut(speed); },
		show: function(speed) { slideIn(speed); }
	};
};