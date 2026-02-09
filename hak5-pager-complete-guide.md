# WiFi Pineapple Pager — Complete Documentation

> Scraped from https://docs.hak5.org/wifi-pineapple-pager/
> Date: 2026-02-09

---



---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/wifi-pineapple-pager-by-hak5/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# WiFi Pineapple Pager by Hak5


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        Taking the industry standard in WiFi pentesting tools mobile, with 1990s flair.




    
        

        ![](/wifi-pineapple-pager/images/pager-transparent.png)


    
	



  
  
  info
  
  
Expect frequent updates to this manual!  Documentation about PineAP features and writing payloads will be coming soon!


  
  

## Welcome to the cutting edge link

The WiFi Pineapple Pager software and documentation are an evolving, living entity.  New features will be added and existing features refined in future releases, and this documentation will grow as well.


This documentation will be continually enhanced and expanded with more examples, content, and clarity.


As always, the Hak5 community is available for conversation and additional information!



## Important Safety Information and Warnings link

Your device may get hot to the touch; this is normal.  Keep the device in a well-ventilated area when in use. Allow for adequate air circulation under and around the device. Do not expose the device to water or extreme conditions (moisture, heat, cold, dust), as the device may malfunction or cease to work when exposed to such elements. Do not attempt to disassemble or repair the device yourself. Doing so voids the limited warranty and could harm you or the device. This device is not designed, manufactured or intended for use in hazardous environments requiring fail-safe performance in which the failure of the device could lead directly to death, personal injury, or severe physical or environmental damage.


The WiFi Pineapple Pager is a network administration and pentesting tool for authorized auditing and security analysis purposes only where permitted subject local and international laws where applicable. Users are solely responsible for compliance with all laws of their locality. Hak5 LLC and affiliates claim no responsibility for unauthorized or unlawful use. © Hak5 LLC.


This device complies with Part 15 of the FCC Rules. Operation is subject to the following two conditions: (1) this device may not cause harmful interference, and (2) this device must accept any interference received, including interference that may cause undesired operation. Warning (Part 15.21) Changes or modifications not expressly approved by the party responsible for compliance could void the user’s authority to operate the equipment. RF Exposure (OET Bulletin 65) To comply with FCC RF exposure requirements for mobile transmitting devices, this transmitter should only be used or installed at locations where there is at least 20cm separation distance between the antenna and all persons. Information to the User - Part 15.105 (b) Note: This equipment has been tested and found to comply with the limits for a Class B digital device, pursuant to part 15 of the FCC Rules. These limits are designed to provide reasonable protection against harmful interference in a residential installation. This equipment generates, uses and can radiate radio frequency energy and, if not installed and used in accordance with the instructions, may cause harmful interference to radio communications. However, there is no guarantee that interference will not occur in a particular installation. If this equipment does cause harmful interference to radio or television reception, which can be determined by turning the equipment off and on, the user is encouraged to try to correct the interference by one or more of the following measures:



- Reorient or relocate the receiving antenna.

- Increase the separation between the equipment and receiver.

- Connect the equipment into an outlet on a circuit different from that to which the receiver is connected.

- Consult the dealer or an experienced radio/TV technician for help.



WiFi Pineapple and WiFi Pineapple Pager are trademarks of Hak5 LLC. This product is packaged with a limited warranty, the acceptance of which is a condition of sale. See Hak5.org for additional warranty details and limitations. Availability and performance of certain features, services and applications are device and network dependent and may not be available in all areas; additional terms, conditions and/or charges may apply. All features, functionality and other product specifications are subject to change without notice or obligation. Hak5 LLC reserves the right to make changes to the products description in this document without notice. Hak5 LLC does not assume any liability that may occur due to the use or application of the product(s) described herein. Made in China. Designed in San Francisco by Hak5 LLC, 548 Market Street, #39371, San Francisco, CA, 94104.



    

    

    
                                            
                                            


	
	
		[Welcome to the WiFi Pineapple Pager navigate_next](/wifi-pineapple-pager/setup/welcome-to-the-wifi-pineapple-pager/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/setup/welcome-to-the-wifi-pineapple-pager/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Welcome, hackers!

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Welcome to the WiFi Pineapple Pager


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        
## Welcome, hackers! link

Welcome to the WiFi Pineapple Pager and the cutting edge new WiFi Pineapple firmware!


New cutting-edge firmware features are released often; we look forwards to expanding the experience of the WiFi Pineapple Pager software, documentation, and payloads.  You can join the community of fellow hackers at hak5.org/community.




    
        

        ![](/wifi-pineapple-pager/images/pager_diagram_light.png)


    
	



## Thermals link

The Pager does a lot of work in a small package.  It is normal for the device to be warm during operation, however:



- Ensure adequate airflow.  Do not block the vents on the pager!

- The screen may be hot to the touch after extended use.




## Charging link

The Pager has an estimated battery life of 4 hours per charge.


We recommend charging the device fully before each engagement.


For longer engagements, the WiFi Pineapple Pager runtime can be extended with the use of a USB battery bank device.  When charging the WiFi Pineapple Pager, ensure the charger has sufficient capability and that you use a high-quality USB-C cable.  For longer engagements, we also recommend starting with the Pager fully charged and connected to a USB battery bank the entire time.  When charging, the Pager will generate more heat; running from external power while fully charged will reduce this.


Most USB-C smartphone chargers will be compatible with the Pager, but not all laptops will be capable of supplying the necessary power.  If you experience difficulty charging your WiFi Pineapple Pager from a laptop or computer, try using a different USB cable, such as a USB-C to USB-A cable.


If the Pager does not indicate charging (solid red) or fully charged (solid green):



- Unplug and replug the charger.

- Try a different USB cable or charger.

- Try a USB-A to USB-C cable instead of USB-C to USB-C

- Power on the Pager.  When fully booted, reconnect the charger.



Please do not attempt the initial setup (or flash a firmware update) until the Pager indicates a normal charging state (solid red) or fully charged (solid green).



    

    

    
                                            
                                            


	
	
		[navigate_before WiFi Pineapple Pager by Hak5](/wifi-pineapple-pager/wifi-pineapple-pager-by-hak5/)
        
	
		[Unboxing Setup navigate_next](/wifi-pineapple-pager/setup/unboxing-setup/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/setup/unboxing-setup/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Unboxing

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Unboxing Setup


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        
## Unboxing link

The WiFi Pineapple Pager arrives running a special firmware called the “stager”.  This staging firmware helps ensure your WiFi Pineapple Pager is set up with the latest firmware and makes the first-time setup process easier.



## Quick start link

To activate the WiFi Pineapple Pager you’ll be following a few simple steps:



- Download the latest firmware

- Power on the Pager

- Connect to the WiFi Pineapple Pager using USB-C

- Upload the firmware using the stager web server

- Enjoy!




## Download the latest firmware link

The WiFi Pineapple Pager firmware can be found on the Hak5 Download Portal.  Download the latest using your PC or laptop, and save it somewhere you can find it.



  
  
  warning
  
  
Hak5 devices are built for security professionals:  They are designed with root access available and the freedom to install any software or firmware.  Hak5 is committed to providing reliable, unrestricted tools and open payload platforms that you can trust.


To ensure your Hak5 devices integrity, only download official firmware from the Hak5 Download Portal (verifiable via checksum).  Genuine Hak5 firmware is never distributed by third party channels, and the newest firmware for your device will always be distributed only on the Download Portal.


  
  

## Power on the Pager link

Press and hold the power button on the top of the Pager for 3-4 seconds, until the LEDs light.  There will also be a subtle click noise.



## Wait for the pager to boot link

The setup boot process will confirm the state of the hardware and initialize the system.  This will take approximately 3-4 minutes.



## Connect the WiFi Pineapple Pager link

Connect your WiFi Pineapple Pager to a PC or laptop using a USB-C data cable connected to the USB-C port on the pager.


Depending on the USB ports available on your PC or laptop, use a USB-C to USB-C or USB-C to USB-A cable, accordingly.



  
  





  
Be careful!  Not all USB cables are created equally!


Be sure to use a data capable high-quality USB-C cable.  Some cheaper cables may be charge-only - these cables will not work!


  
  
When connected via the USB-C port, the Pager will appear as an Realtek RTL8153 USB Ethernet device.  This Ethernet device should be supported on all operating systems (Linux, Windows, and macOS) without the need for additional drivers.



## Connect to the Pager web server link

Once the WiFi Pineapple Pager has booted the staging web server, the screen will prompt you to connect.


Using your PC or laptop browser, connect to http://172.16.52.1:1471 .



  
  





  
Trouble connecting?  Make sure that your computer sees the WiFi Pineapple Pager as a network device (using the network connections options in your operating system) and that it has an IP range in the 172.16.52.x range.


The WiFi Pineapple Pager will automatically give your computer an IP address using DHCP; if your computer does not have an IP or has an IP address in the 169.254.x.x range, refresh the interface using the networking options in your operating system.


  
  

## Follow the directions link

The Stager firmware will prompt you to upload the full firmware for your device - select the firmware you downloaded from the Download Portal.


The Pager will verify the downloaded file and start flashing your device.  The flashing status will be updated on the screen.  Do not turn off the Pager while the firmware is flashing and the device is booting!  Flashing and first boot will take approximately 10 to 15 minutes.



## First boot link

The first time the WiFi Pineapple Pager boots after installing the new firmware image, it must partition and format the internal flash, generate SSH keys, and perform other first-time maintenance.


The first boot process will take significantly longer (five to ten minutes) than subsequent boots.  Be patient!



## Start using your device! link

After flashing and rebooting, your WiFi Pineapple Pager will be ready to use!


Follow the directions on the Pager itself to continue, and keep hacking!



    

    

    
                                            
                                            


	
	
		[navigate_before Welcome to the WiFi Pineapple Pager](/wifi-pineapple-pager/setup/welcome-to-the-wifi-pineapple-pager/)
        
	
		[On-Device Setup navigate_next](/wifi-pineapple-pager/setup/on-device-setup/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/setup/on-device-setup/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Navigating the Pager

                                        
                                            
                                                
                                                *article*
                                                
                                                
# On-Device Setup


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        The WiFi Pineapple Pager brings an on-device onboarding experience with a retro flair.



## Navigating the Pager link

Navigate the UI using the buttons on the pager!


The DPAD (arrow buttons) move your selection up, down, left, and right.


The ‘B’ button (the left-most red button) is used to cancel most actions, or move backwards in the menus.


The ‘A’ button (the green button to the right) is used to activate, acknowledge, or move forwards in the menus.



## Welcome! link



    
        

        ![Welcome to the WiFi Pineapple Pager!](/wifi-pineapple-pager/images/setup/setup/welcome.jpg)


    
	
            
            Welcome to the WiFi Pineapple Pager!


        



## Setting a pin code link



    
        

        ![Set a PIN code](/wifi-pineapple-pager/images/setup/setup/pincode.png)


    
	
            
            Set a PIN code


        


Setting a PIN code protects the on-device user interface of the WiFi Pineapple Pager, much like setting a PIN on a cell phone.  While optional, if you plan to use your WiFi Pineapple Pager where others might also try to touch it, consider setting a PIN!




    
        

        ![We recommend not using the pin code from your luggage](/wifi-pineapple-pager/images/setup/setup/enter_pincode.png)


    
	
            
            We recommend not using the pin code from your luggage


        



## Setting a root password link



    
        

        ![Set your root password](/wifi-pineapple-pager/images/setup/setup/password.png)


    
	
            
            Set your root password


        


Setting a root password is a crucial part of protecting your device.


The root password sets the login password for SSH and the Virtual Pager when connected to the USB-C port or the WiFi Management networks.




    
        

        ![Edit your password](/wifi-pineapple-pager/images/setup/setup/edit_password.png)


    
	
            
            Edit your password


        




    
        

        ![Enter your password](/wifi-pineapple-pager/images/setup/setup/enter_password.png)


    
	
            
            Enter your password


        


Enter your password using the DPAD arrows and the ‘A’ (green) button.  We suggest setting a strong password - a mix of lower and upper case, numbers, and symbols will help keep your device secure!



## Setting timezone link



    
        

        ![Configure timezone](/wifi-pineapple-pager/images/setup/setup/timezone.png)


    
	
            
            Configure timezone


        


The WiFi Pineapple Pager needs to know what your timezone is to accurately show the time.




    
        

        ![Select your timezone offset](/wifi-pineapple-pager/images/setup/setup/enter_timezone.png)


    
	
            
            Select your timezone offset


        



## License link



    
        

        ![License terms](/wifi-pineapple-pager/images/setup/setup/license.png)


    
	
            
            License terms


        


Finally, you must accept the Hak5 license agreements which are available in full at https://hak5.org/license



## Congrats! link



    
        

        ![Congrats and welcome to your pager!](/wifi-pineapple-pager/images/setup/setup/congrats.png)


    
	
            
            Congrats and welcome to your pager!


        



    

    

    
                                            
                                            


	
	
		[navigate_before Unboxing Setup](/wifi-pineapple-pager/setup/unboxing-setup/)
        
	
		[On-Device Tutorial navigate_next](/wifi-pineapple-pager/setup/on-device-tutorial/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/setup/on-device-tutorial/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# On-Device Tutorial


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        Missed the on-device tutorial, or just want to go back and see it again?





    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/01.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/02.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/03.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/04.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/05.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/06.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/07.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/08.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/09.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/10.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/11.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/12.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/13.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/14.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/15.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/setup/tutorial/16.png)


    
	





    

    

    
                                            
                                            


	
	
		[navigate_before On-Device Setup](/wifi-pineapple-pager/setup/on-device-setup/)
        
	
		[Dashboard navigate_next](/wifi-pineapple-pager/device/dashboard/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/device/dashboard/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Power menu

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Dashboard


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        The dashboard is the main interface of the WiFi Pineapple Pager.



## Power menu link



    
        

        ![](/wifi-pineapple-pager/images/device/dashboard/powermenu.png)


    
	


Access the power menu by double-tapping the power button - the recessed button on the top left of the pager.


The power menu allows you do perform a clean shutdown, lock the device, and enable some extra statistics on the UX engine.


Press and hold the power button for 5 seconds to force a power-off; only do this if the normal shutdown menu is not available as it has the potential to corrupt data!



  
  





  
It’s always a good idea to cleanly shut down your device!


Forcing a power-off may corrupt some data if it is actively being written.


  
  

## Alerts link



    
        

        ![](/wifi-pineapple-pager/images/device/dashboard/alerts.png)


    
	


Alert payloads are raised by events generated by nearby devices.  Clients connecting to the WiFi Pineapple access points on the Pager, capturing WPA handshake data, detecting Wi-Fi denial of service attempts, and more can all generate alerts.



## Payloads link



    
        

        ![](/wifi-pineapple-pager/images/device/dashboard/payloads.png)


    
	


User payloads form the heart of the expandability of the WiFi Pineapple Pager.  Written in standard bash script (an extremely powerful, but easy to use, scripting system and shell which is used in millions of Linux and Unix based systems) and enhanced with Hak5 Duckyscript commands (simple shortcuts to perform powerful actions and interact with the WiFi Pineapple Pager UI and more), payloads are where you can launch custom commands, script repeatable behavior, and more.



## Recon link



    
        

        ![](/wifi-pineapple-pager/images/device/dashboard/recon.png)


    
	


Recon is where the WiFi Pineapple Pager flexes the radio capabilities.  Monitor the airspace around you, with displays for Wi-Fi traffic, packet rates, and discovery of new access points and devices.


Then, interactively drill down into the wireless environment and get detailed information about encryption configurations, client counts, and advanced WiFi behavior of discovered devices - and leverage the power of the payload system to run custom actions against clients and access points!



## PineAP link



    
        

        ![](/wifi-pineapple-pager/images/device/dashboard/pineap.png)


    
	


The PineAP suite hosts the WiFi Pineapple active device impersonation - configure Open AP impersonation, mimicked SSID lists, Evil WPA, and more.



## Settings link



    
        

        ![](/wifi-pineapple-pager/images/device/dashboard/settings.png)


    
	



    

    

    
                                            
                                            


	
	
		[navigate_before On-Device Tutorial](/wifi-pineapple-pager/setup/on-device-tutorial/)
        
	
		[Alert Payloads navigate_next](/wifi-pineapple-pager/device/alert-payloads/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/device/alert-payloads/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Adding alert payloads

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Alert Payloads


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        Alerts on the WiFi Pineapple Pager are generated by alert payloads, small easy-to-write scripts which react to events.


Alerts offer a fast way to display events on your device or fire off more complex behavior in the background.



## Adding alert payloads link

Alert payloads are placed in the /root/payloads/alerts/ directory in the appropriate category:


| Catgory | Description |
|---|---|
| deauth_flood_detected | Recon detected a flood of deauthentication packets.  A small amount of deauthentication/disassocation is normal as clients move between networks, but a flood of these packets can indicate a denial-of-service attack. |
| handshake_captured | A WPA-PSK or WPA2-PSK handshake has been captured.  Handshakes can be found in /root/loot/handshakes/ and can be used for offline attacks against a WPA-PSK network.  Learn more about handshakes here! |
| pineapple_client_connected | A client connected to a WiFi Pineapple access point (such as open or WPA) |
| pineapple_client_disconnected | A client disconnected from a WiFi Pineapple access point |



## Running alert payloads link

Alert payloads are automatically triggered when an event happens in the recon system.


All enabled alerts in a category are run when an event occurs.



## Controlling alerts link

Alerts can be listed, enabled, and disabled from the Alerts category of the dashboard.


Each alert payload can be individually enabled or disabled.  Disabled payloads will not be run.




    
        

        ![Select the Alerts panel](/wifi-pineapple-pager/images/device/dashboard/alerts.png)


    
	
            
            Select the Alerts panel


        




    
        

        ![Select the alert category](/wifi-pineapple-pager/images/device/alerts/alerts.png)


    
	
            
            Select the alert category


        




    
        

        ![Each alert can be toggled](/wifi-pineapple-pager/images/device/alerts/alertpicker.png)


    
	
            
            Each alert can be toggled


        



## Developing alert payloads link

Alert payloads are bash scripts with DuckyScript commands: Learn more about developing payloads and how alert payloads work.



    

    

    
                                            
                                            


	
	
		[navigate_before Dashboard](/wifi-pineapple-pager/device/dashboard/)
        
	
		[Payloads navigate_next](/wifi-pineapple-pager/device/payloads/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/device/payloads/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Payloads


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        Payloads on the WiFi Pineapple Pager provide an easy way to expand the functionality of the pager through standard bash scripting enhanced with DuckyScript commands.


User payloads can create user interactions on screen, perform complex actions (anything you can do in Linux you can do in a payload), and are one of the primary ways of expanding the functionality of the Pager.



  
  
  info
  
  
Did you know?


You can use the right and left buttons on the DPAD to scroll through the payload list faster!


  
  

## Installing payloads link

Check out the Payload installation guide for how to install and organize payloads!



## Activating user payloads link

User payloads are activated in the UI by selecting the Payloads category from the dashboard, then selecting the payload to run from the list.




    
        

        ![Select the Payloads option](/wifi-pineapple-pager/images/device/dashboard/payloads.png)


    
	
            
            Select the Payloads option


        


Inside the payloads picker, you can select payloads from any category.




    
        

        ![Select the Payloads category](/wifi-pineapple-pager/images/device/payloads/payloads.png)


    
	
            
            Select the Payloads category


        


Each category may have any number of payloads.




    
        

        ![Payload lists](/wifi-pineapple-pager/images/device/payloads/payloadtitle.png)


    
	
            
            Payload lists


        




    
        

        ![Confirm launching a payload](/wifi-pineapple-pager/images/device/payloads/launchconfirm.png)


    
	
            
            Confirm launching a payload


        


An activated payload can run system commands, custom logic, show basic text output, or prompt for strings, MAC addresses, IP addresses, and more.




    
        

        ![A payload asking for an IP](/wifi-pineapple-pager/images/device/payloads/ippicker.png)


    
	
            
            A payload asking for an IP


        




    
        

        ![Basic payload output](/wifi-pineapple-pager/images/device/payloads/demoip.png)


    
	
            
            Basic payload output


        



## Developing payloads link

The Payload section of the manual covers payload development, check it out!



    

    

    
                                            
                                            


	
	
		[navigate_before Alert Payloads](/wifi-pineapple-pager/device/alert-payloads/)
        
	
		[Recon navigate_next](/wifi-pineapple-pager/device/recon/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/device/recon/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Recon mode

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Recon


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        Use recon to monitor the airspace around you, and display Wi-Fi traffic, packet rates, and discover new access points and devices.


In the Recon screens you can interactively drill down into the wireless environment around you, with detailed information about encryption configurations, client counts, and advanced WiFi behavior of all the devices around you - and then leverage the power of the payload system to run custom actions against clients and access points!



## Recon mode link

The WiFi Pineapple is always collecting data in the background and categorizing wireless devices and traffic around you.




    
        

        ![Select the Recon category from the dashboard](/wifi-pineapple-pager/images/device/dashboard/recon.png)


    
	
            
            Select the Recon category from the dashboard


        



## Recon mode introduction link



    
        

        ![Select the Recon category from the dashboard](/wifi-pineapple-pager/images/device/recon/intro.png)


    
	
            
            Select the Recon category from the dashboard


        


Recon mode starts on the packet traffic screen.  Immediately, you’ll notice some differences!



## Recon status bar link



    
        

        ![Recon status bar](/wifi-pineapple-pager/images/device/recon/intro-topbar.png)


    
	
            
            Recon status bar


        


In Recon mode, the device status bar is updated to include:



- Wigle Wardrive logging.  If you have a USB GPS device connected to your Pager, you can export wardriving data for wigle.net

- GPS status.  If you have a USB GPS device connected to your pager, this will indicate if there is a valid GPS position.

- Recon logging status.  By default recon data is logged to the persistent recon database for offline processing later.

- PCAP logging status.  By default, pcap logging is disabled (pcap logs can grow very large, very quickly!) but if logging is enabled it will be indicated here.

- Brightness.  The standard screen brightness indicator.

- Enabled bands. The WiFi Pineapple Pager can monitor WiFi on 2.4GHz (802.11b, 802.11g, some 802.11n networks, and rarely 802.11ax), 5GHz (802.11a, 802.11n, 802.11ac, 802.11ax), and 6GHz (802.11ac and 802.11ax under the Wi-Fi 6e and WiFi 7 names).  By default, the Pager monitors 2.4GHz and 5GHz.

- Battery.  The standard battery status indicator.

- Time.  The standard time indicator.




## Main graph view link



    
        

        ![Recon graph view](/wifi-pineapple-pager/images/device/recon/intro-main.png)


    
	
            
            Recon graph view


        


In graph mode, recon displays the current rate of events - packets per second, access points discovered, clients discovered, and so on, as a bar graph.


Additionally, the average CPU load of the device is indicated by the red line on the graph.


The data displayed in the graph can be changed using the left and right buttons on the DPAD.



## Graph controls link



    
        

        ![Recon graph controls](/wifi-pineapple-pager/images/device/recon/intro-controls.png)


    
	
            
            Recon graph controls


        


Use the left and right buttons on the DPAD to select the graph data.  Press the A’ (green) button for additional settings!




    
        

        ![Additional Recon settings](/wifi-pineapple-pager/images/device/recon/settings.png)


    
	
            
            Additional Recon settings


        




    
        

        ![Additional Recon settings](/wifi-pineapple-pager/images/device/recon/settings2.png)


    
	
            
            Additional Recon settings


        


The settings menu gives additional control over recon behavior.  Be sure to try out the audio modes!


The settings menu also exposes control of the Wi-Fi channels monitored:




    
        

        ![Additional Recon settings](/wifi-pineapple-pager/images/device/recon/radio.png)


    
	
            
            Additional Recon settings


        



## Recon device lists link



    
        

        ![Recon device lists](/wifi-pineapple-pager/images/device/recon/aps.png)


    
	
            
            Recon device lists


        


Scrolling past the Recon graphs reveals the Recon device view.  This view shows you you the detected wireless devices and clients.




    
        

        ![Recon device summary](/wifi-pineapple-pager/images/device/recon/aps-pill.png)


    
	
            
            Recon device summary


        


In the top left of the Recon Device list, you will find the list summary, showing the total number of devices and the current view page.  Next to these is the update indicator - by default the list is in auto update mode, showing the latest information about the five most recent and strongest wireless devices.


Using the up and down arrows on the DPAD will pause the list, allowing you to scroll through all devices and interact with them.




    
        

        ![Recon device summary](/wifi-pineapple-pager/images/device/recon/ap-frozen.png)


    
	
            
            Recon device summary


        


When scrolling through a list, the refresh icon indicates that updates are frozen, and the currently selected device is highlighted.


Pressing the ‘A’ button (green) on a device opens the device details display.


The list can be un-paused by using the up arrow on the DPAD until the refresh icon is selected and pressing the ‘A’ (green) button, or by jumping directly to the refresh icon by hitting the ‘B’ (red) button and then selecting it with ‘A’.



  
  
  info
  
  
Did you know?


You can use the right and left buttons on the DPAD to scroll through the recon device list faster!


  
  

## Device details link



    
        

        ![Access point details](/wifi-pineapple-pager/images/device/recon/ap-details.png)


    
	
            
            Access point details


        


The device details display shows additional details about a device, advertised SSIDs, encryption types, signal levels, packet counts, connected clients, and more.


The details display is where you view detailed clients lists, interactively control the PineAP filter and advertising behavior for impersonating Open access points (see the PineAP section of the documentation for more on this!), run custom payloads, and perform deauthentication attacks.



## Client details link



    
        

        ![Client list](/wifi-pineapple-pager/images/device/recon/clients.png)


    
	
            
            Client list


        


The Client List display works the same way as the Access Point list, showing all the clients observed on an access point.



  
  
  info
  
  
Remember - an access point does not simply advertise what clients are connected.  For the WiFi Pineapple to associate a client with an access point, it must observe that client generating traffic.


Successfully observing a client means the client must be generating packets at the time that the WiFi Pineapple is monitoring that specific channel.  It may take some time monitoring the area to detect all clients.


Check out the PineAP and Introduction to Wi-Fi documentation for more information!


  
  


    
        

        ![Client details](/wifi-pineapple-pager/images/device/recon/client-details.png)


    
	
            
            Client details


        


The client details display offers a similar suite of options to the network display.



    

    

    
                                            
                                            


	
	
		[navigate_before Payloads](/wifi-pineapple-pager/device/payloads/)
        
	
		[PineAP navigate_next](/wifi-pineapple-pager/device/pineap/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/device/pineap/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# PineAP


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        The WiFi Pineapple PineAP functionality controls network impersonation, client capture, connection filters, and the EvilWPA access point.


Understanding and configuring PineAP is crucial to properly scoping an engagement and limiting the impacted devices, and the PineAP display panel aims to make this as simple and reliable as possible!


Make sure to consult the documentation on PineAP functionality for more information about these options before your first engagement!



## PineAP configuration link

PineAP configuration is found under the PineAP category on the dashboard:




    
        

        ![Select the PineAP category from the dashboard](/wifi-pineapple-pager/images/device/dashboard/pineap.png)


    
	
            
            Select the PineAP category from the dashboard


        





    
        

        ![](/wifi-pineapple-pager/images/device/pineap/pineap-1.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/device/pineap/pineap-1a.png)


    
	




    
        

        ![PineAP Configuration](/wifi-pineapple-pager/images/device/pineap/pineap-2.png)


    
	
            
            PineAP Configuration


        




The PineAP Open Access Point functions as a trap for clients configured for connections to unencrypted access points.


The PineAP Open Access Point can capture a broad range of clients by mimicking multiple network names and automatically responding to any network requested.


To further entice clients to connect to the network, PineAP can advertise previously requested networks.


Basic PineAP configuration can be controlled here:



- Mimic Open Networks.  This option toggles PineAP accepting requests for any Wi-Fi network name permitted by filters.

- Collect Probes.  Automatically collect probed networks in the advertisement pool.

- Advertise Networks.  Some clients will not attempt to connect to a network if it is not being actively advertised.

- Collect Handshakes.  Automatically collect WPA-PSK and WPA2-PSK handshake data for offline attacks against the network passphrase.

- Randomize MAC Address.  Randomize the MAC address used in advertising networks from the SSID pool.

- Wigle Mode.  Enable Wigle Wardriving logs.  This requires a USB GPS.




## PineAP Open Access Point configuration link



    
        

        ![PineAP Configuration](/wifi-pineapple-pager/images/device/pineap/openap.png)


    
	
            
            PineAP Configuration


        


To capture clients connecting to unencrypted access points, the Open AP must be enabled.


The Open AP requires a default SSID, however this may be hidden.  A hidden SSID does not guarantee that the AP is undiscoverable, and clients that have previously seen the AP before it was hidden will continue to show the name.


By default, the PineAP Open AP uses the hardware address (BSSID) of the Wi-Fi interface in the Pager, but an alternate address can be specified with the BSSID option.


Learn more about the Pineapple Open AP functions!



## PineAP EvilWPA Access Point configuration link



    
        

        ![PineAP EvilWPA Configuration](/wifi-pineapple-pager/images/device/pineap/evilwpa.png)


    
	
            
            PineAP EvilWPA Configuration


        


The Pineapple EvilWPA Access Point can be configured to mimic an existing encrypted access point when the encryption key is known.


Additionally, it can be used to capture partial WPA handshakes (PMKID capture mode) which may be useful in offline attacks.


The EvilWPA AP requires a default SSID, however this may be hidden.  A hidden SSID does not guarantee that the AP is undiscoverable, and clients that have previously seen the AP before it was hidden will continue to show the name.


By default, the PineAP EvilWPA AP uses the hardware address (BSSID) of the Wi-Fi interface in the Pager, but an alternate address can be specified with the BSSID option.


Learn more about the Pineapple EvilWPA AP functions!



## SSID Pool link



    
        

        ![PineAP SSID Pool Configuration](/wifi-pineapple-pager/images/device/pineap/ssidpool.png)


    
	
            
            PineAP SSID Pool Configuration


        


The PineAP SSID Pool is the list of open networks used when the Advertise Networks option is enabled.




    
        

        ![PineAP SSID Pool List](/wifi-pineapple-pager/images/device/pineap/ssidpool-list.png)


    
	
            
            PineAP SSID Pool List


        




    
        

        ![PineAP SSID Pool Editing](/wifi-pineapple-pager/images/device/pineap/ssidpool-remove.png)


    
	
            
            PineAP SSID Pool Editing


        



## Filters link

Filters are a critical part of the WiFi Pineapple ecosystem.


Filters allow you to scope your engagement, and only target the devices you plan to target.


PineAP filters apply to the Open and EvilWPA access points.


PineAP has two filters:



- Network filters.  Network filters are applied to the network name (SSID) - only connections to a network name permitted by the filter may connect.

- Client filters.  Client filters are applied to the client MAC address - only connections from a client permitted by the filter may connect.



Both PineAP filters operate in allow or deny mode.



- Allow mode filters only allow connections that are in the allow list.  All other connections are rejected.  Use an allow filter to scope your engagement to specific SSIDs, or to only target specific known clients.

- Deny mode filters allow any connection not explicitly in the deny list.  Use a deny filter to block known clients or networks from an engagement.




### Combining filters link

Typically, PineAP filters of both types are combined.  On an engagement where the target SSIDs are known, the Network Filter is set to Allow Mode, and the list of target SSIDs is added to the allow list.  At the same time, the Client Filter is set to Deny Mode with an empty filter list, allowing the PineAP Open AP to capture any client attempting to connect to one of the target SSIDs.




    
        

        ![PineAP Client Filter](/wifi-pineapple-pager/images/device/pineap/filter-client.png)


    
	
            
            PineAP Client Filter


        




    
        

        ![PineAP Network Filter](/wifi-pineapple-pager/images/device/pineap/filter-network.png)


    
	
            
            PineAP Network Filter


        



## Client List link

Finally, you can view the list of clients connected to the Pager on either the PineAP Open or the PineAP EvilWPA access points.  From within the client list you can view details and kick clients from the access point, automatically adjusting the filters to prevent the client from reconnecting.




    
        

        ![PineAP Client List](/wifi-pineapple-pager/images/device/pineap/clientlist.png)


    
	
            
            PineAP Client List


        




    
        

        ![PineAP Client List](/wifi-pineapple-pager/images/device/pineap/clientpick.png)


    
	
            
            PineAP Client List


        



    

    

    
                                            
                                            


	
	
		[navigate_before Recon](/wifi-pineapple-pager/device/recon/)
        
	
		[Ringtones navigate_next](/wifi-pineapple-pager/device/ringtones/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/device/ringtones/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            RTTTL ringtones

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Ringtones


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        The WiFi Pineapple Pager uses the rtttl format for ringtones.


RTTTL - the Ring Tone Text Transfer Language - was developed originally by Nokia for transferring ringtones to cell phones.  This seemed highly appropriate for use with the Pager!


You can learn more about the internals of the RTTTL format here



## RTTTL ringtones link

Very large quantities of ringtones can be found on the Internet; use your favorite search engine and search for “RTTTL ringtone collection” for instance.


A RTTTL ringtone will look something like this:





  
  
  

  
  
  
  

  

  
  
```
Desk Phone:d=8,o=5,b=500:c#,f,c#,f,c#,f,c#,f,c#,f,4p.,c#,f,c#,f,c#,f,c#,f,c#,f,1p.,c#,f,c#,f,c#,f,c#,f,c#,f,4p.,c#,f,c#,f,c#,f,c#,f,c#,f
```


  
It consists of a name, default octave and note lengths, and the note data.



## Uploading ringtones link

Ringtones should be placed in /root/ringtones.


Each ringtone file should have a single ringtone, and be named whatever-you-want.rtttl.


Ringtones can be copied using scp or sftp (or a graphical front end for these tools), or created on the device directly using a text editor such as nano or vim.



## Testing ringtones link

Ringtones can be tested using the RINGTONE command, by passing either a complete ringtone string (in quotes!) or the name of the ringtone file.





  
  
  

  
  
  
  

  

  
  
```
root@pager:/mmc/root# RINGTONE "Desk Phone:d=8,o=5,b=500:c#,f,c#,f,c#,f,c#,f,c#,f,4p.,c#,f,c#,f,c#,f,c#,f,c#,f,1p.,c#,f,c#,f,c#,f,c#,f,c#,f,4p.,c#,f,c#,f,c#,f,c#,f,c#,f"
```


  

    

    

    
                                            
                                            


	
	
		[navigate_before PineAP](/wifi-pineapple-pager/device/pineap/)
        
	
		[GPS navigate_next](/wifi-pineapple-pager/device/gps/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/device/gps/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# GPS


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        You can add a USB GPS receiver to the WiFi Pineapple Pager; this lets the Pager know where it is.


With a GPS, the Pager is able to collect access point locations and log them to a Wigle compatible file for uploading!



  
  
  warning
  
  
Expectations about GPS


A very important thing to remember about a USB GPS receiver is that it is highly unlikely to perform like a smartphone.  The location data provided by a smartphone is almost always a fusion of muliple location services - GPS, cellular, Wi-Fi, and Bluetooth positioning all feeds into the location system, and actual GPS is rarely the primary source.


Pure GPS requires a clear view of the sky, and many GPS devices may require fifteen to thirty minutes to get a positional lock, however once locked, most units will get future locks quickly.


Often true GPS will not work indoors, and may not even work near a window with a partial view of the sky.  This is, unfortunately, normal.  The signals from the GPS satellites are extremely weak, and the system was designed with a clear sky view as a requirement.


Different GPS hardware may have wildly different performance in terms of lock speed and ability to lock with partial view of the sky.


Always check the manual for your GPS hardware for settings and suggested antenna orientation!


  
  

## GPS devices link

The WiFi Pineapple Pager supports nearly all USB serial GPS devices - in fact we have not yet found one readily available which is not supported - however not all devices are designed equally.


Much like Wi-Fi devices, what matters with a GPS is the radio inside, not the name on the plastic.  Also much like Wi-Fi, different GPS receivers have different sensitivity and supported satellites.


The term GPS is technically misused - a more accurate term would by GNSS (Global Navigation Satellite System).  There are multiple global positioning constellations operated by different nations.  The satellites operated by the United States use the brand GPS, however other networks such as GLONASS, Galelio, and BeiDou are operated by Russia, the European Union, and China, respectively.


Some GPS receivers are able to combine signals from multiple operators - these tend to be able to obtain a position faster and more reliably than receivers which are only able to use one set of satellites.


Receivers we have found to be useful in testing include:



- U-Blox M8030-KT.  This receiver can be found in many readily available USB devices.

- Quectel.  This receiver can also be found in many USB devices.



These are by no means the only receivers available, nor the only ones which will work, however these receiver chipsets can be commonly found, and support multiple GNSS satellite types.  In general when purchasing a USB serial receiver, check for:



- Advertised Linux support.  While almost any should work, advertised support increases the odds.

- A listed receiver chip type.  There are many, many clones on the market, and often when no receiver type is listed, it is the most basic version.  Listing a receiver type helps identify the higher-end devices.

- Multiple constellation support.  Whenever possible, select a device with GPS, GLONASS, Galelio, and BaiDou support.




  
  
  info
  
  
High-End GPS hardware


Some GPS receiver hardware is advertied as very high end, high speed, and high precision.  This can be true, and as long as it outputs a compatible format (most do) it will work, however that degree of precision and update speed is not necessary for Wi-Fi mapping, and may introduce configuration complexities and additional cost for little or no benefit.


  
  

## Configuring GPS link

GPS is configured via the UI under Settings > GPS:




    
        

        ![GPS settings](/wifi-pineapple-pager/images/device/settings/gps.png)


    
	
            
            GPS settings


        


You can also set the GPS using the command-line DuckyScript commands GPS_LIST and GPS_CONFIGURE.



#### Serial port link

Supported GPS devices connect as a USB serial device.  Typically these will be named ttyUSBx or ttyACMx depending on the serial converter chip the manufacturer used; unfortunately, these serial port numbers can change if the order that USB devices are plugged in changes.


To address this, the Pineapple Pager uses the USB device path to identify a serial device.  This path is based on the physical hardware of the pager and USB hubs.


A GPS device connected to the USB-A port will typically appear as 1.1_1-1.1:1.0, indicating the USB bus and port.  A GPS plugged into a hub plugged into the USB-A port may appear as a different path.


As nearly all users will have a single GPS unit, in almost all situations, only a single serial device will appear in the list!



  
  
  info
  
  
Want to find out what the original serial port device is?  Just log in over SSH or the Virtual Pager terminal!





  
  
  

  
  
  
  

  

  
  
```
root@pager:/mmc/root# ls -l /dev/serial/by-path/1.1_1-1.1:1.0
lrwxrwxrwx  1 root  root  12 Jan 23 14:05 /dev/serial/by-path/1.1_1-1.1:1.0 -> /dev/ttyUSB0
```


  
You might notice other devices in this directory as well - those are internal, unused devices on the Pager; we hide them in the UI automatically because they can never be a GPS!


  
  

#### Baud rate link

Serial GPS units must have the proper speed setting for the serial port.  Typically this is one of:



- 4800

- 9600

- 115200



When in doubt, check the manual for your GPS receiver for the correct speed.  Other speeds are possible, however rarely used.


After changing the GPS serial port or baud rate, choose Restart GPSd.



## Testing GPS link

Once the GPS has a lock, the GPS icon in the status bar will highlight, and the position data in Settings > GPS will reflect the current position.



  
  
  warning
  
  
Remember - getting a GPS lock may take fifteen to thirty minutes, or sometimes more, depending on your view of the sky and your GPS receiver hardware!  Unfortunately this is a limitation of the GPS/GNSS network, not the WiFi Pineapple Pager!


  
  
Real-time information about the GPS unit including number of satellites and lock status can be viewed with the command-line tool cgps, either via ssh or in the terminal of the Virtual Pager.



## Wigle and Wardriving link

Wardriving (derived from wardialing, a once-popular method of finding exposed resources by calling every phone number in an area code and mapping where modems were found) is the hobby of collecting information about Wi-Fi networks.


Wigle is a world-wide central, public database of Wi-Fi position information collected by members, using tools like the official Wigle Android app, Kismet, or now, the WiFi Pineapple Pager.


With Wigle enabled via Recon > Settings, the Pager generates a Wigle-compatible log in /root/loot/wigle/.  This can be downloaded via scp or sftp, or via the Virtual Pager Download Loot and uploaded to Wigle.




    
        

        ![Wigle capture](/wifi-pineapple-pager/images/device/settings/wigle.png)


    
	
            
            Wigle capture


        


You can also use the command-line DuckyScript commands WIGLE_START and WIGLE_STOP to enable Wigle logging, and the commands WIGLE_LOGIN and WIGLE_UPLOAD to automatically log in to your Wigle account and upload logs.



  
  
  info
  
  
Please remember: Hak5 is not officially affiliated with Wigle.  Accounts you create and information you share with Wigle are subject to the Wigle End User Agreement.  The WiFi Pineapple Pager will never automatically interact with Wigle - even when creating a Wigle log file - unless you log into a Wigle account and choose to upload using the DuckyScript commands or a payload.


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before Ringtones](/wifi-pineapple-pager/device/ringtones/)
        
	
		[External Packages navigate_next](/wifi-pineapple-pager/device/external-packages/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/device/external-packages/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Advanced users

                                        
                                            
                                                
                                                *article*
                                                
                                                
# External Packages


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        The WiFi Pineapple Pager is built on top of the OpenWRT embedded Linux distribution.


OpenWRT includes a package management tool - opkg - and a collection of third-party packages.


These can be installed on the Pineapple Pager to add additional tools, however there are some precautions to follow.  Read on for more information!



## Advanced users link

Installing third-party packages is done via the command line, and may have unforseen consequences.


Payloads which require external packages may ask to install them automatically.  Installing packages manually may cause issues with available space, compatibility, or enabling services which disrupt normal operation of your Pineapple Pager.  Only install third-party packages if you know the implications of the tool and if you are willing to risk a factory reset if the package causes conflcits.  While most packages are fine, it is impossible to know that every package is compatible!



  
  
  warning
  
  
NEVER use opkg to update pre-installed system packages!  Doing so will most likely break your device or lead to unusable core features.  OpenWRT isn’t designed like a normal Linux distribution, and bulk-upgrading system packages will nearly always cause problems!


  
  

## Installation locations link

By default, opkg installs to the root overlay of the device.  The root overlay is the remainder of the internal boot flash, after the core firmware is installed.  Typically this is a very limited amount of space:  less than 32MB is available after the WiFi Pineapple Pager firmware is installed.  Completely filling the overlayfs may cause problems with your device.


opkg can install to the mmc, which is a 4GB storage device where /root, payloads, loot, and themes are also installed.  When installing large third-party packages, it is always a good idea to install to the MMC partition:





  
  
  

  
  
  
  

  

  
  
```
root@pager:~# opkg install -d mmc python3
```


  

  
  
  info
  
  
Use opkg install -d mmc ... to install packages to the much larger mmc partition!


  
  

## Packages and upgrading link

Packages installed to the root overlay will not persist over a firmware upgrade.  Upgrading the firmware rebuilds the internal flash partitions, saving only specific configuration files.


Packages installed to mmc will persist over a firmware upgrade.  It is possible that an upgrade to a future major release will break installed packages, however, depending on changes in the firmware.  If, after an upgrade to a future major release, installed third-party binaries return an error, it may be necessary to update or reinstall them.



## Installing packages link

To install packages with opkg from the OpenWRT repository, your Pager needs Internet access.


To install third-party packages, first you must update the package listing.  This is similar, for instance, to performing an apt update command on Debian or Ubuntu.





  
  
  

  
  
  
  

  

  
  
```
root@pager:~# opkg update
```


  
Once the opkg database is updated, packages can be found via opkg list.  Combine this with grep to find a specific package by name:





  
  
  

  
  
  
  

  

  
  
```
root@pager:~# opkg list | grep python3
```


  
Packages can then be installed using opkg install.  Remember to use opkg install -d mmc to install packages to the larger MMC partition!



## Python and PIP link

When installing Python packages, always prefer a packaged solution for a module.  OpenWRT includes many Python3 modules pre-packaged.


Installing a Python package via Pip may trigger compiling C native code or other dynamic components.  Typically compiling on the Pager directly is not supported and will have mixed results at best.



## Disclaimer link

REMEMBER: Installing third-party packages via opkg is done at your own risk.  Changing system configuration or packages outside of the Pineapple environment, or installing different versions of system packages, may break Pineapple services.


As always, Hak5 supports the idea that you should be able to do whatever you want with your own hardware - but we cannot guarantee that third party packages will be compatible.


As always, factory reset and in extreme cases, firmware recovery options exist if a package prevents your Pager from operating properly.



    

    

    
                                            
                                            


	
	
		[navigate_before GPS](/wifi-pineapple-pager/device/gps/)
        
	
		[Connecting the WiFi Pineapple Pager navigate_next](/wifi-pineapple-pager/connecting/connecting-the-wifi-pineapple-pager/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/connecting/connecting-the-wifi-pineapple-pager/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Connecting via USB-C

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Connecting the WiFi Pineapple Pager


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        The WiFi Pineapple Pager has multiple ways to connect to networks and devices:



- USB-C

- Wi-Fi Client Mode

- Wi-Fi Management Access Point

- USB Ethernet




## Connecting via USB-C link

The USB-C port of the Pager presents as a USB Ethernet device, allowing you to connect the Pager directly to a PC or laptop.  The USB-C port is also used for charging.


Internally to a Realtek RTL8153 Ethernet chip, chosen because it is supported by all current operating systems (Linux, BSD, Windows, and macOS) and should not required additional driver installation.


The Pager uses the 172.16.52.0/24 IP range, and will automatically assign a DHCP address to devices connected via the USB-C port.


Devices connected to the USB-C port are allowed to connect to the SSH server and the Virtual Pager page.



## Connecting to Wi-Fi as a client link

The Pager can also act as a Wi-Fi client device and connect to existing WiFi networks.


In client mode, the WiFi Pineapple Pager will connect to an existing 2.4GHz access point and obtain an IP address via DHCP.  Client mode supports 2.4GHz access points, and Open, WPA, WPA2, and WPA3 networks.  Access points on 5GHz, or enterprise authentication, are not supported in client mode.


The Pager in client mode will act as a normal network device - payloads on the Pager will be able to access the network (and the Internet, assuming the connection has connectivity), and the Pager itself can fetch firmware updates directly.


Pager mode can be enabled in the Pineapple Pager Settings panel, under Settings > Network > Client Mode Setup.  It can also be configured via SSH using the WIFI_CONNECT command.


For example,





  
  
  

  
  
  
  

  

  
  
```
root@pager:/mmc/root# WIFI_CONNECT wlan0cli 'MyHomeNetwork' psk2 'Beansbeansbans' ANY
```


  
You can run WIFI_CONNECT --help for more information on using the shell setup commands.



  
  
  info
  
  
Remember - client mode uses the more limited 2.4GHz-only radio, so make sure your network is available on 2.4GHz!


  
  

## Connecting via Wi-Fi Management link

The WiFi Pineapple Pager can optionally enable a management Wi-Fi network.  This network is protected by WPA2-PSK or WPA3-SAE, and allows you to connect to the Pager from any Wi-Fi capable device.


The management network can be enabled via the Pineapple Pager Settings panel, under Settings > Network > Management AP Setup.   It can also be configured via SSH using the WIFI_MGMT_AP command.


For example,





  
  
  

  
  
  
  

  

  
  
```
root@pager:/mmc/root# WIFI_MGMT_AP wlan0mgmt 'PagerManagement' sae-mixed 'SuperSecret_PagerPassword'
```


  
You can run WIFI_MGMT_AP --help for more information on using the shell setup commands.


Devices connected to the Wi-Fi Management access point are allowed to connect to the SSH server and the Virtual Pager page.



## USB Ethernet link

The Pager supports most USB Ethernet chipsets.  A USB Ethernet adapter can be plugged into the WiFi Pineapple Pager A port, and the Pager will automatically use it for network connectivity.



    

    

    
                                            
                                            


	
	
		[navigate_before External Packages](/wifi-pineapple-pager/device/external-packages/)
        
	
		[SSH and the WiFi Pineapple Pager navigate_next](/wifi-pineapple-pager/connecting/ssh-and-the-wifi-pineapple-pager/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/connecting/ssh-and-the-wifi-pineapple-pager/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Connecting to SSH

                                        
                                            
                                                
                                                *article*
                                                
                                                
# SSH and the WiFi Pineapple Pager


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        The WiFi Pineapple Pager supports standard SSH.



## Connecting to SSH link

The Pager accepts SSH connections from the USB-C and Management Access Point networks.


The Pager always uses the IP address 172.16.52.1 on these networks, and SSH runs on the standard TCP port 22.


When connecting to SSH, use the user root and your system password you configured during first-time setup.



## SSH clients link

Almost all modern operating systems have the standard ssh client pre-installed as the command-line tool ssh.  Additionally, more user-friendly graphical clients exist for most platforms.



  
  
  warning
  
  
If you use a third-party SSH client, be sure to download it from a reputable source - such as your OS vendors app store.  Because SSH handles login data, it is a common target for fake tools.


  
  

## SCP link

SCP is a standard file transfer protocol which uses ssh under the covers.  Like SSH, almost all modern operating systems will ship a standard command-line too, scp.  More user-friendly file transfer clients also exist for most platforms.



  
  
  warning
  
  
If you use a third-party SCP client, be sure to download it from a reputable source - such as your OS vendors app store.  Because SCP handles login data, it is a common target for fake tools.


  
  
SCP allows you to easily transfer files (like loot, themes, and payloads) to and from your Pager.



## It’s your system link

SSH provides direct root access to the system - by design, we strive to give you the ability to do anything you want with your system.  It’s your system.


With this ability comes a degree of risk - changing the configuration directly or modifying system files out from under the Pineapple service and experience may have unexpected results.


The Factory Reset, and extreme cases, Firmware Recovery procedures can be used to recover the device.


We encourage you to explore and hack on your system, just remember that when you’re root, there are fewer guardrails!



    

    

    
                                            
                                            


	
	
		[navigate_before Connecting the WiFi Pineapple Pager](/wifi-pineapple-pager/connecting/connecting-the-wifi-pineapple-pager/)
        
	
		[Virtual Pager navigate_next](/wifi-pineapple-pager/connecting/virtual-pager/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/connecting/virtual-pager/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Connecting to the Virtual Pager

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Virtual Pager


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        The Virtual Pager is the web-based interface to the Pineapple Pager, which provides a live view of the WiFi Pineapple Pager screen, a terminal, and loot download links.



## Connecting to the Virtual Pager link

The virtual pager site is available from the USB-C and Management Wi-Fi networks.


Point a browser at http://172.16.52.1:1471 to access the virtual pager site.



  
  
  info
  
  
Make sure to use the full URL http://172.16.52.1:1471 .  Many browsers will attempt to use https on all sites, or will treat the IP address as a search term!


  
  

## Logging in link



    
        

        ![](/wifi-pineapple-pager/images/virtualpager/login.jpg)


    
	


Log in to the Virtual Pager site using your device password you set during device setup.



## The Virtual Pager link



    
        

        ![](/wifi-pineapple-pager/images/virtualpager/main.jpg)


    
	


From the Virtual Pager you can control the Pager itself as if you were physically pressing the buttons.  The screen is a live display of the Pager screen contents.


From the sidebar menu on the left-hand side you can directly download zip archives of captured WPA handshake files (pcap and hashcat format), download all captured loot, and archive loot.



  
  
  info
  
  
Archived loot is moved to /root/loot/archive/!


  
  
The terminal is a standard shell - connecting via SSH or using the terminal will work the same!



    

    

    
                                            
                                            


	
	
		[navigate_before SSH and the WiFi Pineapple Pager](/wifi-pineapple-pager/connecting/ssh-and-the-wifi-pineapple-pager/)
        
	
		[Firewall navigate_next](/wifi-pineapple-pager/connecting/firewall/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/connecting/firewall/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Why is there a firewall?

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Firewall


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        By default, the Pineapple Pager has a firewall which limits access to the admin interfaces (SSH and the Virtual Pager) to connections made via the USB-C and Management Wifi (if configured) networks.



## Why is there a firewall? link

The management interface firewall is in place for three main reasons:



- To protect access to your device.  When connected in client mode, or when capturing clients via the Pineapple access points, you may not wish to allow any connections from other devices on the network.

- To help remain hidden.  Making the Virtual Pager easily discoverable to clients on the open network is an easy loss to stealth!

- To protect access to your device!  Thanks to the mess caused by self-signed SSL certificates, meaningfully protecting the Virtual Pager interface with https is essentially impossible.  Accessing your virtual pager over http from an unprotected network can expose your admin password.




## Turning off the firewall link

Hak5 strongly believes that you own your device and can make your own decisions about security.  While we don’t recommend disabling the firewall, you certainly can.


To disable the firewall, make the following change in /etc/config/firewall:





  
  
  

  
  
  
  

  

  
  
```
config include
      option name 'hak5admin'
      option hak5ver '100'
      option type 'script'
      option path '/etc/firewall.d/admin'
      option enabled '1'
```


  
To:





  
  
  

  
  
  
  

  

  
  
```
config include
      option name 'hak5admin'
      option hak5ver '100'
      option type 'script'
      option path '/etc/firewall.d/admin'
      option enabled '0'
```


  
Then restart the firewall with the command:





  
  
  

  
  
  
  

  

  
  
```
fw4 restart
```


  

  
  
  info
  
  
The fw4 command will print warnings about ignored values in the configuration file.  This is normal!  The Pager uses these placeholder version values to help when applying firmware updates.  Most tools ignore these extra values, but fw4 likes to complain.


  
  

  
  
  report
  
  
If you have disabled the admin firewall, you must ensure that your root/admin password is strong and you should never log into the Virtual Pager from an untrusted network, such as the Pineapple Open access point (open networks have no encryption) or from an untrusted network you are a client of (such as a conference network, hotel network, or other network that you have connected to in client mode).


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before Virtual Pager](/wifi-pineapple-pager/connecting/virtual-pager/)
        
	
		[Introduction navigate_next](/wifi-pineapple-pager/pineapple-functions/introduction/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/pineapple-functions/introduction/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            A collection of features

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Introduction


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        
## A collection of features link

The WiFi Pineapple experience is a suite of related tools and functionality working together to create the Wi-Fi recon and mimicry system.



## Recon mode link

Recon (reconnaissance) mode surveys the wireless environment and builds a view of access points and devices.


The recon system is the core of the WiFi Pineapple experience when collecting data, finding misconfigured devices, and tracking wireless device and access point behavior.



  
  
  info
  
  
Recon mode relies on channel hopping to cover the different Wi-Fi channels.  By spending a small amount of time on each channel, it can build a view of the networks on all channels.


Because channel hopping can only spend a short time on each channel, client detection may take longer - a client must be active at the same time as the Pineapple is looking at that channel, so not all clients will be detected immediately.


Channel hopping is optimized to pause if a handshake packet is seen, increasing the chances of successfully capturing a full handshake.


  
  

#### Access point detection link

Access points - even “hidden” access points - continually advertise their presence.  By rapidly changing channels, the WiFi Pineapple collects these advertisements, which include the network name, channel, encryption settings, and more.



#### Hidden access point decloaking link

Hidden access points were never designed as part of the 802.11/Wi-Fi standards - they have always been a hack, and discoverable.  By monitoring client behavior, the Pineapple is able to discover the name of a hidden network whenever a client joins.



#### Client detection link

The WiFi Pineapple detects active clients, even on encrypted networks.  While encryption protects the content of the client connection, it does not obscure the client MAC address of the client or the destination.  Using the MAC addresses of the clients and access points, the Recon system is able to map out what APs a client connects to.


When a client is looking for networks to connect to, it transmits probe packets, often including the list of networks the client has previously joined (the “preferred network list”).  The Recon system collects these, making it easier to determine where a client has previously been active and what networks it may be willing to connect to.



#### Handshake collection link

WPA-PSK and WPA2-PSK networks can be vulnerable to an offline attack against connection handshakes.  In an offline attack, the attacker does not need to be connected to the network; instead, captured handshake data can be used to brute force credentials.  WPA3 was designed to fix this weakness, so handshakes from WPA3 networks are not vulnerable in the same way.


Whenever a client connects to a Wi-Fi WPA-PSK or WPA2-PSK network, it performs a multi-stage handshake where a unique per-client encryption value is exchanged.  Handshakes are also generated every time a client refreshes the encryption key - typically every 5 minutes.


The WiFi Pineapple looks for handshake packets and, in collection mode, automatically attempts to capture the related packets, saving them in the /root/loot/handshakes/ directory.


Handshake collection works with the channel hopping system:  when a handshake packet is seen, the channel hopping system automatically delays the next channel change, maximizing the chances of capturing a complete handshake exchange.


A collected handshake can be used for with tools such as hashcat.  These tools run on a desktop or laptop, and often require GPU acceleration.  Typically these tools would not be run on the WiFi Pineapple directly, as they require significant processing power and resources.



## Open AP mimicry mode link

The Pineapple Open access point is one of the strongest tools during a pentest engagement.  The Pineapple Open access point allows a single WiFi Pineapple to act as many access points with different names, capturing clients when they probe for target networks in the clients preferred network list.


Pineapple Open access points use a filter mechanic to ensure your engagement is scoped properly; filters can be configured to allow or block any combination of network names and client addresses.



  
  
  info
  
  
Scoping your engagement is always important!  It ensures that you are only targeting devices you expect to target!


  
  

## WPA Evil Twin mode link

Clone an existing access point, create a generic WPA access point, or attempt to capture partial handshakes for PMKID attacks with WPA Evil Twin mode.


Learn more about Evil Twin mode here!



## SSID pool advertising link

To help entice clients into connecting to the Pineapple Open AP, in addition to allowing connections to multiple SSIDs, the Pineapple can advertise specific SSIDs from the SSID Advertisement Pool.


Coupled with recon mode, the Pineapple can automatically add probed SSIDs to the pool!



## Client disconnection and deauthentication link

To aid in capturing clients and handshakes during a pentest, the WiFi Pineapple Pager can attempt to disconnect clients connected to an existing access point, subject to regulatory limitations (DFS and 6GHz) and modern client protection (WPA3 and 802.11w PMF).



  
  
  warning
  
  
Due to strong regulatory restrictions on DFS and 6GHz Wi-Fi channels, injection is not possible against networks on these channels.


Additionally, all networks on 6GHz require WPA3 protections (even ‘open’ networks on 6GHz require WPA3-OWE); WPA3 includes Protected Management Frames or PMF, which prevents injected disconnection packets.


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before Firewall](/wifi-pineapple-pager/connecting/firewall/)
        
	
		[Recon navigate_next](/wifi-pineapple-pager/pineapple-functions/recon/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/pineapple-functions/recon/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Recon mode features

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Recon


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        Recon mode (or reconnaissance mode), is how the Pineapple suite surveys the surrounding wireless landscape.


Recon mode is a fully passive feature.  By simply listening to the packets sent by devices in the area, the Pineapple builds a view of access points and clients around it.



## Recon mode features link


#### Channel coverage link

A Wi-Fi NIC can only tune to a single channel at a time, but Wi-Fi has dozens (or in some cases, hundreds) of channels.  How do we monitor them all without dozens or hundreds of Wi-Fi cards?


The Recon engine automatically hops between channels in the enabled Wi-Fi bands.  Each band defines a standard set of channels:  Wi-Fi can operate on 2.4GHz (the original Wi-Fi radio frequencies, and typically the slowest and most crowded), 5GHz (expanded channels with less range but typically much faster, used by most modern devices), and 6GHz (a very new channel allocation larger than both 2.4Ghz and 5GHz combined, but with less range and very few devices able to use it yet).


By default, the Wi-Fi Pineapple Pager monitors the 2.4GHz and 5GHz ranges.  The 6GHz range can be turned on in the Recon settings or the global System settings under Settings > Network > 6GHz.


Recon mode optimizes how it uses radios automatically.  Packets are captured from any available radio, and if a handshake packet is detected, the channel hopping automatically attempts to capture the rest of a handshake before continuing to the next channel.



#### Access point detection link

Every access point advertises its presence with beacon packets - a type of Wi-Fi packet which declares that an access point is present, the network name (or SSID), the encryption options, and often other information about the network.


Beacon packets are how a traditional Wi-Fi device builds a list of networks to join.  The WiFi Pineapple Recon engine takes this further:  by using raw capture mode instead of relying on the firmware of the Wi-Fi NIC, it is able to detect a network from a single packet.



#### Hidden access point detection link

Hidden access points were never intended as part of the IEEE802.11 / Wi-Fi standard; they were created by manufacturers in an attempt to hide the network identity.  Since it was never part of the standard, hiding the network name from beacons does not protect it from being used in other packets.


Recon mode will automatically decloak hidden networks when a client joins.



#### Client and device detection link

Devices generate packets when joining and leaving networks and exchanging data.  Even with fully modern encryption (such as WPA3), while the data may be protected, the unique MAC addresses of the client, the access point, and the destination device, are not.  Using this information, the Pineapple can build a list of what devices are communicating with access points in the area - and what networks they’re looking to connect to, if they are not connected!


Channel hopping spends a short amount of time on each channel, sampling the packets.  Because the Pineapple can only detect packets from devices which are actively transmitting at the time that it is monitoring that channel, not all clients will be detected immediately, however over time as the Pineapple returns to a channel with clients, more data will be collected and the client list will grow.



  
  
  info
  
  
Client MAC Randomization


Almost all modern operating systems use a feature called MAC randomization, which is often turned on by default.


To help prevent user tracking, MAC randomization changes the address of the Wi-Fi device - sometimes for every network, sometimes on a time-based schedule, sometimes both, depending on the operating system.


When a client changes MAC address, it will appear as a new device in recon - a fully randomized device does not have any ties to previous records - however it may share similar characteristics, such as trying to join the same list of networks.


  
  

#### Client network detection link

When a Wi-Fi client is looking for a network to join, it operates in one of three basic patterns:



- Passive network observation.  By simply receiving the beacons from access points in the area, a client can compare against the list of configured networks it might join.  In this mode, a client is invisible until joining a network.

- Broadcast probe.  A client may send a special packet - a probe request - indicating it wants to join a network, but with no network name specified.  This allows networks to respond to the client with the configured network name, and the client uses this information to build the network list.  Recon mode can detect these clients, and they often join a network immediately after.

- Named probe.  If a client can not discover any networks from the configured list passively, or if there are any hidden networks configured on the device, it will start sending probe requests for networks it has previously been configured for.  This allows the Pineapple to build a list of networks the device is looking for (which we’ll use later!), and can be used for identifying unique clients or where else a client may have been.




#### Handshake collection link

WPA-PSK and WPA2-PSK networks can be vulnerable to an offline dictionary attack.  In an offline attack, an attacker does not need to be connected to the network, instead specific packets (the WPA handshake) are collected, and a list of suspected passwords is compared to the data to try to find a match.


A dictionary attack can be extremely CPU intensive and involve hundreds of millions of possible passwords and combinations.  An offline attack is performed on a laptop (or preferably desktop or server) computer, not on the Pineapple device itself, and typically a fast GPU is required for practical attacks.


One of the most powerful and popular tools for performing attacks against password hashes is Hashcat.


The Pineapple automatically collects WPA handshakes in PCAP and Hashcat .22000 hcappx format (both files contain the same information, in slightly different formats).


Handshakes are captured and stored in /root/loot/handshakes/ and can be downloaded via scp, sftp, or via the Virtual Pager interface.



  
  
  info
  
  
Handshakes are generated when a client joins a network or when the network session refreshes (every 300 seconds per client, by default).  To capture handshakes, the WiFi Pineapple must be on the proper channel at the proper time.


Handshakes will be passively collected whenever possible, and locking to a specific network or channel (via the Pineapple Pager UI or the PINEAPPLE_EXAMINE_CHANNEL and PINEAPPLE_EXAMINE_BSSID commands in the shell or in a payload) can help increase the chances of capturing a handshake.


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before Introduction](/wifi-pineapple-pager/pineapple-functions/introduction/)
        
	
		[Pineapple Open AP navigate_next](/wifi-pineapple-pager/pineapple-functions/pineapple-open-ap/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/pineapple-functions/pineapple-open-ap/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            How mimicry works

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Pineapple Open AP


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        Open Wi-Fi networks offer no encryption and no verification of the connection.  Despite the inherent risks, open networks are still in use everywhere - airports, coffee shops, corporate guest networks, and more.


The Pineapple Open access point can not only mimic a Wi-Fi network, it can mimic any Wi-Fi network.  At the same time.



## How mimicry works link

Whenever a Wi-Fi client joins a network, it sends a special packet - a probe request.  An access point willing to accept that connect then responds with a probe response packet.


Under normal circumstances, an access point only responds with the SSID (network name) it is providing - usually a one-to-one relationship.


Using a Wi-Fi attack called karma, a Pineapple in mimicry mode will answer any request for a network name with a response - for that same name.  Once connected, the client considers the connection to be completely normal!


The SSIDs allowed to connect are controlled by the Pineapple filter system - keep reading for more information!



## Enabling Pineapple Open AP mode link

The WiFi Pineapple has four controls which impact Pineapple Open AP mode:



- Enabling the Open Wi-Fi access point itself.  To mimic an Open access point, the open access point must - unsurprisingly - be turned on.  The Open AP configuration can be found under PineAP > Open AP.

- Enabling mimic mode.  With this disabled, the Open AP is just an Open AP - it will function for the configured SSID but nothing more.  Mimic mode is found under PineAP > PineAP > Mimic Open Networks

- The Client filter.  The Client filter controls what clients are allowed to join the Pineapple Open AP network.  The Client filter can be found in PineAP > Filters.

- The Network filter.  Network filter controls what network names the Pineapple Open AP responds to.  The SSID filter can be found in PineAP > Filters.





    
        

        ![](/wifi-pineapple-pager/images/device/pineap/pineap-1.png)


    
	




    
        

        ![PineAP Configuration](/wifi-pineapple-pager/images/device/pineap/openap.png)


    
	
            
            PineAP Configuration


        



## Pineapple filters link

The Pineapple filter engine is the main mechanism for scoping the WiFi Pineapple behavior for an engagement.  Properly configuring your filters is a crucial part of impacting only the devices and networks you intend to!



#### Filter modes link

Pineapple filters operate in two modes:



- Allow mode.  In allow mode, only devices and networks in the allowed list may connect.  All other connections are rejected.

- Deny mode.  In deny mode, any device or network not in the deny list may connect.



So, for example, to allow any client to connect to the Pineapple Open AP using the SSIDs Test network and Free Wi-Fi, you would set:



- The device filter to deny mode, with no filter list (this allows any client to connect, useful with MAC address randomization)

- The network filter to allow mode, with the allow list containing the two SSIDs in the engagement.




#### Default filters link

By default, the Pineapple ships with Client and Network filters both set to allow mode, with empty lists.  This blocks all associations, which prevents a new Pineapple from interfering with nearby devices or networks unintentionally.




    
        

        ![PineAP Client Filter](/wifi-pineapple-pager/images/device/pineap/filter-client.png)


    
	
            
            PineAP Client Filter


        




    
        

        ![PineAP Network Filter](/wifi-pineapple-pager/images/device/pineap/filter-network.png)


    
	
            
            PineAP Network Filter


        



## Pitfalls link


- Remember filters!




    

    

    
                                            
                                            


	
	
		[navigate_before Recon](/wifi-pineapple-pager/pineapple-functions/recon/)
        
	
		[Pineapple Evil WPA navigate_next](/wifi-pineapple-pager/pineapple-functions/pineapple-evil-wpa/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/pineapple-functions/pineapple-evil-wpa/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Enabling EvilWPA mode

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Pineapple Evil WPA


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        The passphrase for a WPA network is meant to be kept secret, but often, is not.  In many environments, the PSK is posted publicly - either accidentally, or as a semi-public guest network.



## Enabling EvilWPA mode link

EvilWPA is configured via PineAP > Evil WPA.


Use EvilWPA to match the passphrase and encryption type of the target access point.




    
        

        ![PineAP EvilWPA Configuration](/wifi-pineapple-pager/images/device/pineap/evilwpa.png)


    
	
            
            PineAP EvilWPA Configuration


        



## Partial handshake capture link

EvilWPA mode also allows partial handshake capture.


Typically, packets from both devices (the access point and the client) are required for attempting to crack a WPA handshake.


EvilWPA allows partial handshake capture - capturing only the handshake sent by the client - for use in a PMKID attack.


Partial PMKID handshake data captured will be saved in /root/loot/handshakes/.



    

    

    
                                            
                                            


	
	
		[navigate_before Pineapple Open AP](/wifi-pineapple-pager/pineapple-functions/pineapple-open-ap/)
        
	
		[SSID Pool navigate_next](/wifi-pineapple-pager/pineapple-functions/ssid-pool/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/pineapple-functions/ssid-pool/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# SSID Pool


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        The Pineapple SSID Pool is a list of Wi-Fi networks to artificially advertise.


The Pineapple Open AP can mimic any number of SSIDs - but many clients won’t connect to a network if they have not seen a beacon for that network name!


The SSID pool fills this gap by advertising a list of additional networks, enticing clients to send a connection request which the Open AP is able to capture.



## Filling in the SSID Pool link

The first step to using the SSID pool functionality is to add SSIDs to the list.


SSIDs can be added manually or automatically.



#### Manually adding SSIDs link

SSIDs can be added via the UI from the PineAP options, under PineAP > SSID Pool




    
        

        ![PineAP SSID Pool Configuration](/wifi-pineapple-pager/images/device/pineap/ssidpool.png)


    
	
            
            PineAP SSID Pool Configuration


        




    
        

        ![PineAP SSID Pool List](/wifi-pineapple-pager/images/device/pineap/ssidpool-list.png)


    
	
            
            PineAP SSID Pool List


        




    
        

        ![PineAP SSID Pool Editing](/wifi-pineapple-pager/images/device/pineap/ssidpool-remove.png)


    
	
            
            PineAP SSID Pool Editing


        


SSIDs can also be manipulated via the command line (either via ssh, the Virtual Pager, or in a payload) using the PINEAPPLE_SSID_POOL_ADD, PINEAPPLE_SSID_POOL_LIST, and PINEAPPLE_SSID_POOL_DELETE DuckyScript commands.



#### Automatically adding SSIDs link

The Pineapple recon system can also automatically collect probed SSIDs - network names clients have explicitly searched for.  This allows the pool to automatically adapt to the client environment.


Automatic collection can be enabled via the UI under PineAP > Collect Probes




    
        

        ![PineAP probe collection](/wifi-pineapple-pager/images/device/pineap/collect-probes.png)


    
	
            
            PineAP probe collection


        


Or via the command line with the PINEAPPLE_SSID_POOL_COLLECT_START and PINEAPPLE_SSID_POOL_COLLECT_STOP DuckyScript commands.



  
  
  info
  
  
Remember your filters!


When the Network filter is set to ALLOW mode, you will need to add any SSIDs in the SSID Pool to the allowed list!


  
  

## Enabling SSID Pool advertising link

To actually transmit SSIDs in the pool, you must enable advertising.  This is done in the UI under PineAP > Advertise Network.




    
        

        ![PineAP SSID pool advertising](/wifi-pineapple-pager/images/device/pineap/advertise-networks.png)


    
	
            
            PineAP SSID pool advertising


        


Similarly, via the command line or payloads, the PINEAPPLE_SSID_POOL_START and PINEAPPLE_SSID_POOL_STOP DuckyScript commands control advertising.



#### Address randomization link

By default, PineAP uses the MAC address (BSSID) of the Open AP interface.  This tends to have the most success with most clients, however some Wireless monitoring systems and intrusion detection systems may easily detect that a single access point is acting unusually.


The Randomize Address option allows PineAP to generate random BSSID addresses for each SSID, which makes it less obvious that one device may be emulating many networks - however many modern WiFi clients will not attempt to connect to the Pineapple Open AP if the addresses do not match.


Your mileage may vary - try both options depending on the types of clients you are targetting!



## SSID Pool size link

The SSID Pool is limited to 64 SSIDs - Each SSID takes time to advertise, and must be advertised for multiple seconds before a client will attempt to connect to it.


When adding SSIDs, the oldest SSIDs in the pool list are automatically expired as new SSIDs are added.



    

    

    
                                            
                                            


	
	
		[navigate_before Pineapple Evil WPA](/wifi-pineapple-pager/pineapple-functions/pineapple-evil-wpa/)
        
	
		[Handshake Collection navigate_next](/wifi-pineapple-pager/pineapple-functions/handshake-collection/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/pineapple-functions/handshake-collection/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Handshake Collection


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        Wi-Fi networks using the WPA-PSK and WPA2-PSK suites are vulnerable to an offline dictionary attack against the secret key.



  
  
  info
  
  
An offline attack means the attacker has collected all the information needed to attempt to attack the network key, and can do so at leisure.


Offline attacks are typically performed on a computer with a GPU to accelerate calculations, and with password lists of hundreds of thousands or millions of attempts.


  
  

## WPA Handshakes link

Rather than simply using the same encryption key for all clients, when a device joins a WPA-PSK or WPA2-PSK network, it performs a special packet exchange - dubbed a handshake - to establish a temporary key which the client uses.


By collecting this handshake, it is possible to attempt to recreate the secret data by trying thousands (or millions) of passwords.  When the secret matches, you now know the original pre-shared key (PSK).


Handshakes are generated when a client connects to a network and when a client session is refreshed (by default, each client refreshes the temporary encryption data every 300 seconds, or 5 minutes.)



## Collecting handshakes link

Collecting a handshake requires several things:



- A client actively connecting to a WPA-PSK or WPA2-PSK network.  Handshakes are only generated when a client is connecting.

- The Wi-Fi Pineapple Pager must be on the correct channel at this moment.  During normal recon mode the Pager rapidly changes channels to build a view of the Wi-Fi environment.

- Critical portions of the handshake must be captured.  A handshake consists of 4 specific packets; to successfully attack a handshake specific packets are required.




  
  
  info
  
  
Handshake capture can sometimes be difficult for all these reasons, and the fact that handshakes are transmitted as data packets.  While beacon packets (network advertisements) are management packets which are typically sent at lower transmission speeds, data packets are subject to automatic speed scaling.


Based on the capabilities of the client and access point, and the signal quality of the connection, data packets can be sent at variable speeds.  The higher the capabilities and connection quality, the faster the data rate used for clients.


As the data rate of the packets increases, it becomes more difficult to passively capture a packet.  Higher speeds are transmitted with more complex encodings, and on multiple antenna systems, they are transmitted with radio modes which can make capture very challening.  The Pineapple recon engine is designed to maximize the chances of capturing a handshake, including setting channel configuration to capture the most data encoding types possible, and pausing channel hopping the instant the first packet in a handshake is seen.


It may be necessary to monitor for a long period of time (even up to hours, in a completely passive environment) to capture a full handshake - this is a normal part of how Wi-Fi operates.


  
  

## Maximizing handshake collection link

To maximize handshake collection, the Pager can be set to a specific channel.  This can be done using the DuckyScript commands PINEAPPLE_EXAMINE_CHANNEL and PINEAPPLE_EXAMINE_BSSID to stop channel hopping and pause on a single channel, or to automatically find the channel of a known access point and pause hopping, respectively.


These commands can be run from a ssh session or the terminal in the Virtual Pager, or activated by user or recon payloads.


When locked to a channel, the Pager has the maximum chance of collecting handshakes, but will not be able to monitor devices or access points on other channels.


Handshake collection can be combined with client deauthentication to increase the chances of capture - whenever a client joins a network it performs a handshake, so by forcing clients to reconnect, new handshakes may be generated.  The Pineapple client disconnection feature can be triggred from the command line or a payload using the PINEAPPLE_DEAUTH_CLIENT command.



  
  
  warning
  
  
Be sure to only trigger client deauthentication against networks that are in the scope of your engagement!


Deauthenticating clients from networks which aren’t yours and which you haven’t been given permission to test isn’t only a jerk move, it may be illegal in some jurisdictions.  Know the laws of your region!


  
  
Return to normal recon mode with PINEAPPLE_EXAMINE_RESET.



## Downloading Handshakes link

Captured handshakes are stored in /root/loot/handshakes/.  Handshake files are stored in the original pcap format and the Hashcat hcappx format.


You can download handshakes from your Pager using scp or sftp, or by downloading loot via the Virtual Pager.



    

    

    
                                            
                                            


	
	
		[navigate_before SSID Pool](/wifi-pineapple-pager/pineapple-functions/ssid-pool/)
        
	
		[Introduction to Payloads navigate_next](/wifi-pineapple-pager/payloads/introduction-to-payloads/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/introduction-to-payloads/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Introduction to Payloads


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        
  
  
  info
  
  
This section of the manual is being updated, expect more information about payload creation and Pineapple DuckyScript Commands soon!


  
  
The WiFi Pineapple Pager is expandable via the payload system.


Payloads are scripts integrated with DuckyScript commands which leverage the power of the WiFi Pineapple system.


DuckyScript is the payload language of Hak5 gear.


Originating on the Hak5 USB Rubber Ducky as a standalone language, the Packet Squirrel uses DuckyScript commands to bring the ethos of easy-to-use actions to the payload language.


DuckyScript commands are always in all capital letters to distinguish them from other system or script language commands. Typically, they take a small number of options (or sometimes no options at all).


Payloads can be constructed of DuckyScript commands alone, or combined with the power of bash scripting and system commands to create fully custom, advanced actions.



## Payloads link

The Pager uses three types of payloads:



#### Alert payloads link

Alert payloads are small, typically non-interactive scripts launched in response to conditions in the environment.  Alert payloads can take simple actions like displaying a message, playing a ringtone,


Alert payloads can be run for various conditions which can happen at any time while the Pineapple is operating:



- WPA handshake capture

- Wi-Fi Denial of Service attacks

- A client connecting to a Pineapple access point

- Authentication details captured by a Pineapple access point



Alert payloads can be run at any time when background events occur; they should be slim and minimal, as they may be launched repeatedly.



#### User payloads link

User payloads are the fully-featured big brother to Alert payloads.


User payloads are run by the user from the Payload section of the main device dashboard.


User payloads expose the full range of Pineapple DuckyScript commands, which lets developers construct user interactions for entering text, IP addresses, MAC addresses, confirming actions, displaying logs and status results, and more.



#### Recon payloads link

Recon payloads are run against access points and clients discovered by the recon process.


Recon payloads also utilize the full range of Pineapple DuckyScript commands and user interactions.



  
  
  info
  
  
Already familiar with DuckyScript commands?  Please keep reading!


The DuckyScript ecosystem strives to bring common commands to the entire line of Hak5 products, however commands unique to each product will not work on other devices.  Payloads may look similar, but not all commands will be available on all devices (The WiFi Pineapple Pager is not a keyboard injection device, for instance, so inject commands from the USB Rubber Ducky will not work).


  
  

## Payload repository link

The official Hak5 payload repository is available at https://github.com/hak5/wifipineapplepager-payloads/tree/master


This includes Hak5 example scripts and community contributed payloads.


Payloads in the repository are organized into alert, recon, and user, with further sub-categories.



  
  
  warning
  
  
Payloads from the Payload Repository are provided for educational purposes only. Hak5 gear is intended for authorized auditing and security analysis purposes only where permitted subject to local and international laws where applicable. Users are solely responsible for compliance with all laws of their locality. Hak5 LLC and affiliates claim no responsibility for unauthorized or unlawful use.


While Hak5 audits payloads before they are accepted into the payload repository, use of third party payloads is at your own risk.


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before Handshake Collection](/wifi-pineapple-pager/pineapple-functions/handshake-collection/)
        
	
		[Installing Payloads navigate_next](/wifi-pineapple-pager/payloads/installing-payloads/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/installing-payloads/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Downloading payloads

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Installing Payloads


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        Payload installation on the Pineapple Pager is one of the areas which will see significant usability improvements in future firmware updates.  Expect revisions to this process and this manual!



## Downloading payloads link

The official Hak5 payload repository is available at https://github.com/hak5/wifipineapplepager-payloads/tree/master


This includes Hak5 example scripts and community contributed payloads.


Payloads in the repository are organized into alert, recon, and user, with further sub-categories.



  
  
  warning
  
  
Payloads from the Payload Repository are provided for educational purposes only. Hak5 gear is intended for authorized auditing and security analysis purposes only where permitted subject to local and international laws where applicable. Users are solely responsible for compliance with all laws of their locality. Hak5 LLC and affiliates claim no responsibility for unauthorized or unlawful use.


While Hak5 audits payloads before they are accepted into the payload repository, use of third party payloads is at your own risk.


  
  

  
  
  report
  
  
Payloads are powerful scripts which can perform many actions on your device.  Use caution when installing payloads from any source, but especially installing payloads from a third party source such as Discord, or any site besides the official Hak5 Payload Repository.


If you do not understand the actions a payload performs, do not install or run it.


  
  
The payload repository can be cloned using standard git tools, or downloaded as a zip file containing all payloads in the repository.



## Copying payloads to the device link

If you download the payload repository using a computer (via git or zip), payloads can then be copied to the Pineapple Pager using the standard scp file copy tool.  This is available as a command line tool on all major operating systems.  There are also many graphical versions of scp, such as WinSCP for Windows platforms and FileZilla on macOS.



  
  
  warning
  
  
If you are copying payloads from a Windows system, be sure to set the transfer options correctly!


Windows uses a different format for new lines.  If you transfer payloads using Windows linefeeds, they will not work on the Pager!


If your file transfer tool contains options for text-mode transfer, make sure that it is configured to use Unix (or Linux) linefeed.


For example, in the WinSCP tool, when copying, click “Transfer Settings”, set “Transfer Mode” to “Text”, enable “Convert line endings”, and choose “Unix (LF)”.


  
  

### Copying via graphical tools link

When connecting to the Pager, select the scp or sftp protocols.  sftp is a variant of scp; legacy basic FTP is not supported.


Use the root user to log in, and the password that you created during setup.


The default root home directory - /root (or /mmc/root - they are the same location) - contains the payloads directory.


Copy payloads into the appropriate payloads directory and category.



  
  
  info
  
  
The Pager supports scp and sftp protocols.  These are not the same as traditional ftp or ftp-ssl; make sure to select the proper protocol in your file transfer program!


  
  

### Copying via Command Line link

First, clone the git repository





  
  
  

  
  
  
  

  

  
  
```
$ git clone https://github.com/hak5/wifipineapplepager-payloads.git
Cloning into 'wifipineapplepager-payloads'...
remote: Enumerating objects: 105, done.
remote: Counting objects: 100% (105/105), done.
remote: Compressing objects: 100% (56/56), done.
remote: Total 105 (delta 20), reused 45 (delta 9), pack-reused 0 (from 0)
Receiving objects: 100% (105/105), 23.79 KiB | 3.96 MiB/s, done.
Resolving deltas: 100% (20/20), done.
```


  
Next, we’ll copy one of the payloads.





  
  
  

  
  
  
  

  

  
  
```
$ cd wifipineapplepager-payloads
$ scp -r library/alerts/pineapple_client_connected/example root@172.16.52.1:/root/payloads/alerts/pineapple_client_connected/
root@172.16.52.1's password: ******
payload.sh
```


  
Several things are going on in this command:



- We change directories to the git repository we cloned.  This isn’t required, but makes it easier.

- We use the command-line scp tool.

- The -r argument tells scp to copy recursively.  We need this because we are copying the entire payload directory.

- library/alerts/pineapple_client_connected/example is the payload we wish to copy.

- root@172.16.52.1 indicates the username (root) and address (172.16.52.1, the address of the Pager).

- The second half of the destination root@172.16.52.1:/root/payloads/alerts/pineapple_client_connected/ indicates where to place the files; in this case, we put the payload in the alerts/pineapple_client_connected directory.




## Payload directories link

When copying a payload to the Pager, remember that each payload consists of one or more files, such as payload.sh.  Each payload should be a directory, and placed in the appropriate location for that payload:  Alert payloads go in /root/payloads/alerts/, user payloads in /root/payloads/user/, and so on.


For example,





  
  
  

  
  
  
  

  

  
  
```
payloads/
payloads/alerts
payloads/alerts/pineapple_client_connected
payloads/alerts/pineapple_client_connected/example
payloads/alerts/pineapple_client_connected/example/payload
```


  
If a payload does not appear in the payload list under Alerts or Payloads from the dashboard, make sure you have placed the payload in the proper location.



  
  
  info
  
  
Remember:  Alert payloads show up under the Alerts icon on the Pineapple Pager dashboard, while User payloads show up under the Payloads icon!


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before Introduction to Payloads](/wifi-pineapple-pager/payloads/introduction-to-payloads/)
        
	
		[Introduction to Scripting navigate_next](/wifi-pineapple-pager/payloads/introduction-to-scripting/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/introduction-to-scripting/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Introduction to Scripting


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        WiFi Pineapple Payloads are written in bash.  Bash is a shell - the interactive text environment when you log into a system.  If you are more familiar with Windows environments, it is similar (but not quite the same) as the Windows command line or powershell.


Like most shells, bash includes a scripting language for performing tasks; the Pager leverages this as the language behind Payloads.



  
  
  info
  
  
There are many shells with similar names, functionality, and scripts.  Often one version of shell scripting will work as expected with other shells, but there may be variations in specific support.  When following generic shell scripting guides, make sure that they are for the bash style!


  
  

## An introduction link

In these docs we’ll strive to give an introduction to basic scripting and programming concepts and how to make your first working payloads.


Beyond the basics, shell scripting can be incredibly power - but also incredibly complex.   When moving beyond the basics, we suggest:



- https://linuxconfig.org/bash-scripting-tutorial-for-beginners

- https://www.redhat.com/sysadmin/learn-bash-scripting




## Editing payloads link

Payloads can be edited or created anywhere with a text editor, including on the Pager itself using the vim or nano editors, using Hak5 Payload Studio, or on a computer using a syntax highlighting editor such as VSCode, SublimeText, or even a basic editor like Notepad.



## The Bash shell link

A shell is a command-line interface that allows users to interact with the operating system by executing commands. The shell acts as an intermediary between the user and the operating system, and is responsible for interpreting and executing user commands.


When a user enters a command into the shell, the shell parses the command and determines what action needs to be taken. The shell then initiates the required system calls to launch the command.


The shell also provides various features and utilities to help users manage and manipulate their environment. It provides the ability to define and use variables, create and execute scripts, and navigate the file system.


When you are logged into a system via the command line, chances are, you’re interacting with one of several standard shells. On Windows it is typically the legacy command shell or the more modern Powershell. On Linux, it is typically the bash or dash shells, however dozens exist. On macOS, typically you are using the z shell, or zsh.


With the exception of the Windows command shell and Powershell, most modern shell environments operate extremely similarly, and often scripts written for one shell will operate fine on another. Unfortunately there are some situations where this is not always true, especially when using more advanced pattern matching and other scripting features.


The WiFi Pineapple Pager payload system uses the bash shell: bash (the Bourne Again Shell) was derived from sh (the Bourne Shell). It was created in 1987 by Brian Fox for the GNU Project as a free software replacement for the Bourne shell (sh).


Bash incorporates many features of the original Bourne shell, as well as improvements and new features from other shells such as the C shell (csh) and the Korn shell (ksh). This includes features such as command-line editing, history, and job control, and critically for the payload system, the ability to define functions and variables.


Over the years, Bash has become the default shell on most Linux distributions, and was the default on macOS until it was replaced by zsh in macOS Catalina. It is also available on other operating systems such as Windows, where it can be installed using the Windows Subsystem for Linux.


Bash has continued to evolve over time, with new features and improvements being added in each release. It is a powerful and flexible shell that is widely used in the Linux and Unix communities, both for interactive use and for writing scripts and automation tasks.



## DuckyScript Commands link

Originating on the Hak5 USB Rubber Ducky as a standalone language, the WiFi Pineapple Pager uses DuckyScript commands to bring the ethos of easy-to-use actions to the payload language.


DuckyScript commands are always in all capital letters to distinguish them from other system or script language commands. Typically, they take a small number of options (or sometimes no options at all).


Payloads can be constructed of DuckyScript commands alone, or combined with the power of bash scripting and system commands to create fully custom, advanced actions.



  
  
  info
  
  
Remember - Payloads with DuckyScript Commands are not the same as a payload for the USB Rubber Ducky, which is written purely in the DuckyScript language.


Payloads are written in bash scripting language, with DuckyScript Commands for the Pager helping with complex tasks and simplifying user interaction via the Pineapple UI.


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before Installing Payloads](/wifi-pineapple-pager/payloads/installing-payloads/)
        
	
		[Speedrunning Payload Dev navigate_next](/wifi-pineapple-pager/payloads/speedrunning-payload-dev/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/speedrunning-payload-dev/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Interpreter line

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Speedrunning Payload Dev


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        For the best chance of success in payload development we highly recommend reading all of the available documentation, but here is a cheat-sheet for speedrunning understanding payloads.



## Interpreter line link

Every shell script starts with a special line, which tells Linux what interpreter to use to run the script (in our case, bash, for other scripts this could be Python, zsh, or others).


Payloads on the WiFi Pineapple are run under a specially configured environment which always executes under Bash; the interpreter line is not required.  Including it, however, will not cause a problem.


If present, an interpreter line starts with #! and includes the path to the shell interpreter:





  
  
  

  
  
  
  

  

  
  
```
#!/bin/bash
```


  

## Comments link

Comments in payloads are indicated by the hash symbol:  #.  Anything following a hash is ignored as a comment.





  
  
  

  
  
  
  

  

  
  
```
# This whole line is a comment

echo foo        # from here on is a comment
```


  
Comments are a good way to indicate intent and organize code, but remember - what matters is what the code does, not what the comments say!  When reading a payload to learn what it does, trust the code!



## Payload information link

Payload authorship and information is configured with a set of standard comments at the top of the payload:





  
  
  

  
  
  
  

  

  
  
```
# Title: An awesome payload title
# Description: A longer description about the payload functionality
# Author: Your Name <yourname@youremail.com>
```


  
The information comments are used by the UI to show more information about a payload and to give credit in the payload repository.



## Variables link

Variables store data under a name for use later in a script.


There are multiple types of variables in a Payload:



- Environment variables: These variables are set by the shell and are available to all programs that run in the shell environment. Examples include $PATH, which contains a list of directories to search for executable files, and $HOME, which contains the user’s home directory.  Environment variables are used in Payloads to send extra data in alert and recon payloads.

- User-defined variables: These variables are created by the user in the script and can be used to store any type of data. They are typically created using the syntax varname=value, where varname is the name of the variable and value is the value to be assigned to it. For example, name="John" creates a variable called name with the value "John".

- Positional parameters: These variables are used to store arguments passed to a script or function when it is launched. The first argument is stored in $1, the second argument in $2, and so on. For example, if a script is called with the command ./myscript.sh arg1 arg2, then $1 would contain "arg1" and $2 would contain "arg2". Payloads are not executed with arguments, so the positional parameters will always be empty, but positional arguments are also used for functions.

- Process and result variables: These variables are set automatically by bash to reflect the behavior of recently executed processes. Among others, bash manages the interval variables $! which holds the process ID of the last backgrounded process, $? which holds the exit status of the last command, and $$ which holds the process ID of the currently running script itself. These allow scripts to execute background commands, retrieve the results of a command, and manage commands and functions run in the background.



Variables can be referenced in a script using the syntax $varname, where varname is the name of the variable. For example, echo $name would print the contents of the variable "name" to the screen. Variables can also be used in calculations or as arguments to other commands.


It’s important to note that variable names are case-sensitive in bash!


Variables can also be printed with the syntax ${varname}, such as echo ${varname}.  This works the same as $varname.



## Quotes link

Quotes have special meaning.



#### Double quotes (") link

Double quotes ensure a string is treated as a single argument.  This is important in several ways:



- Some commands expect specific argument ordering.  If you want to pass multiple words to an argument, they need to be enclosed in quotes!

- Some characters have special meaning (like ', #, ;).  Using quotes makes sure the payload treats them as text!






  
  
  

  
  
  
  

  

  
  
```
echo "I'm a sentence with special characters; this wouldn't work without quotes!"
```


  
Within double-quotes, variables are still treated normally.





  
  
  

  
  
  
  

  

  
  
```
myvar="beans"
echo "I want to print some ${beans}"
```


  

#### Single quotes ("’") link

Single quotes ensure a string is treated as a single argument, and disable any interpretation of special characters.  This means variable expansion, command execution, and other special features are not processed!





  
  
  

  
  
  
  

  

  
  
```
myvar="beans"
echo 'This will print literally ${beans}, not the content of the variable!'
```


  

## Tests link

The most basic test is if.  There are many ways to write an if statement, however the simplest is to use the if [ test ]; then ... fi syntax.





  
  
  

  
  
  
  

  

  
  
```
value=10
if [ $value -lt 20 ]; then
    echo "Less than 20!"
fi
```


  

  
  
  info
  
  
There are many ways to test variables; check out the variables page for more!


  
  

## Testing command success link

When a command or function exits, it sets a return code.  A return code of 0 indicates no error, while any other return code indicates an error.


The return code of a process is stored in the special variable $?.


To compare a number we use the comparison -ne (not equal):





  
  
  

  
  
  
  

  

  
  
```
CONFIRMATION_DIALOG "Are you sure you want to continue?"
if [ $? -ne 0 ]; then
    LOG "User said no"
    exit 0
fi
```


  
You may also see a simpler syntax used:  || automatically runs the next block of code if the command fails, and && runs the next block if the command succeeds.





  
  
  

  
  
  
  

  

  
  
```
CONFIRMATION_DIALOG "Are you sure you want to continue?" || {
    LOG "User said no"
    exit 0
}
```


  
Often this is represented in an even shorter form - if no other action is required besides exiting:





  
  
  

  
  
  
  

  

  
  
```
CONFIRMATION_DIALOG "Are you sure?" || exit 0
```


  

  
  
  info
  
  
IP_PICKER is an example of a DuckyScript command which makes it simple to present an IP address entry window to the user; find out more in the list of DuckyScript commands!


  
  

## Getting the output of a command link

Many DuckyScript commands print a result when the user has selected something.


In Payloads, this can be done with $(command...).  Notice this uses normal parenthesis $(...), not curly braces!





  
  
  

  
  
  
  

  

  
  
```
user_ip=$(IP_PICKER "Pick an IP" "1.2.3.4")

echo ${user_ip}
```


  

  
  
  info
  
  
IP_PICKER is an example of a DuckyScript command which makes it simple to present an IP address entry window to the user; find out more in the list of DuckyScript commands!


  
  

## Combining output and success link

The output of a command can be captured and the error code checked simultaneously!  For example, to exit if a user cancels the IP picker…





  
  
  

  
  
  
  

  

  
  
```
user_ip=$(IP_PICKER "Pick an IP" "1.2.3.4") || exit 0
```


  

## Exiting payloads link

The same return code which indicates if a command succeeded or not is used to determine if a payload executed properly.


The return code is set via the exit function.  A return code of 0 is considered a success, while any other number is considered a failure.


If a payload does not explicitly return a successful status, the status of the last command is sent.


To avoid the Pager reporting there was a problem running your payload, make sure to always include an exit 0:





  
  
  

  
  
  
  

  

  
  
```
# Title: Example

... do some things

exit 0
```


  

    

    

    
                                            
                                            


	
	
		[navigate_before Introduction to Scripting](/wifi-pineapple-pager/payloads/introduction-to-scripting/)
        
	
		[Alert Payloads navigate_next](/wifi-pineapple-pager/payloads/alert-payloads/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/alert-payloads/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Keep it small!

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Alert Payloads


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        Pineapple Alert payloads are launched in response to events detected by the Pineapple Recon service.


Alert payloads are small, responsive payloads launched when events occur.  An alert payload may generate a full screen alert, but can not otherwise interact with the user



## Keep it small! link

Remember - alerts can happen at any time.  Generally, it’s important to keep an alert payload small, and perform simple actions.


Alert payloads can be launched when the user is on any screen; because they interrupt the user, they do not have a normal payload interface and can not launch dialogs or input pickers, but can use the ALERT DuckyScript comamnd to show information.


When designing an Alert payload, keep in mind that all the alert payloads for an event run whenever the event occurs.  Playing a sound or setting a LED status may make sense, but if every payloads attempts to do so at the same time, it doesn’t help the user.



## Alert environment link

When an Alert payload is launched, it is given all the information about the event in the form of environment variables.  Environment variables are accessible in a payload by name, such as ${_RECON_SELECTED_AP_CHANNEL}


deauth_flood_detected [link](#deauth_flood_detected)| Variable | Payload | Description |
|---|---|---|
| PAYLOAD_HOME | All | Directory where the payload is installed |
| _ALERT | deauth_flood_detected | Alert name (deauth_flood_detected) |
| _ALERT_DENIAL_MESSAGE | deauth_flood_detected | Human-readable description of the event |
| _ALERT_DENIAL_SOURCE_MAC_ADDRESS | deauth_flood_detected | Source of the denial flood |
| _ALERT_DENIAL_DESTINATION_MAC_ADDRESS | deauth_flood_detected | Destination of the denial flood |
| _ALERT_DENIAL_AP_MAC_ADDRESS | deauth_flood_detected | Access point targetted denial flood |
| _ALERT_DENIAL_CLIENT_MAC_ADDRESS | deauth_flood_detected | Client targetted by denial flood |




handshake_captured [link](#handshake_captured)| Variable | Payload | Description |
|---|---|---|
| PAYLOAD_HOME | All | Directory where the payload is installed |
| _ALERT | handshake_captured | Alert name (handshake_captured) |
| _ALERT_HANDSHAKE_SUMMARY | handshake_captured | Human-readable description of handshake |
| _ALERT_HANDSHAKE_AP_MAC_ADDRESS | handshake_captured | MAC address of the access point |
| _ALERT_HANDSHAKE_CLIENT_MAC_ADDRESS | handshake_captured | MAC address of the client |
| _ALERT_HANDSHAKE_TYPE | handshake_captured | Type of handshake (EAPOL, PMKID) |
| _ALERT_HANDSHAKE_COMPLETE | handshake_captured | Is the handshake a complete 4-way + beacon handshake? (only EAPOL) |
| _ALERT_HANDSHAKE_CRACKABLE | handshake_captured | Does the handshake contain the proper packets to be considered attackable by normal tools? (only EAPOL) |
| _ALERT_HANDSHAKE_PCAP_PATH | handshake_captured | Path to the handshake pcap logfile |
| _ALERT_HANDSHAKE_HASHCAT_PATH | handshake_captured | Path to the handshake hashcap 22000-format logfile |




client_connected [link](#client_connected)| Variable | Payload | Description |
|---|---|---|
| PAYLOAD_HOME | All | Directory where the payload is installed |
| _ALERT | client_connected | Alert name (client_connected) |
| _ALERT_CLIENT_CONNECTED_SUMMARY | client_connected | Human-readable summary of client connection |
| _ALERT_CLIENT_CONNECTED_CLIENT_MAC_ADDRESS | client_connected | Client MAC address |
| _ALERT_CLIENT_CONNECTED_SSID | client_connected | SSID client connected to |
| _ALERT_CLIENT_CONNECTED_SSID_LENGTH | client_connected | Length of SSID client connected to |



    

    

    
                                            
                                            


	
	
		[navigate_before Speedrunning Payload Dev](/wifi-pineapple-pager/payloads/speedrunning-payload-dev/)
        
	
		[Recon Payloads navigate_next](/wifi-pineapple-pager/payloads/recon-payloads/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/recon-payloads/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Recon environment

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Recon Payloads


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        Recon payloads are run from the Pager UI after selecting an access point or client from the Pineapple Recon device list.


Recon payloads add new features and actions for discovered devices.



## Recon environment link

The Pineapple Recon system collects a large amount of data about the wireless environment.


This data is shared with a recon payload via environment variables.  Environment variables are accessible in a payload by name, such as ${_RECON_SELECTED_AP_CHANNEL}


All payloads [link](#all-payloads)All recon payloads have basic data - such as the directory the payload is installed - added to the environment.


| Variable | Payload | Description |
|---|---|---|
| PAYLOAD_HOME | All | Directory where the payload is installed |


Access point payloads [link](#access-point-payloads)When a recon payload is run for a selected access point, all available data from the access point is included:


| Variable | Payload | Description |
|---|---|---|
| _RECON_SELECTED_AP_OUI | Access point | OUI / Manufacturer name |
| _RECON_SELECTED_AP_BEACONED_SSIDS | Access point | Number of beaconed SSIDs |
| _RECON_SELECTED_AP_PROBED_SSIDS | Access point | Number of probed SSIDs (if AP has also acted like a client) |
| _RECON_SELECTED_AP_RESPONDED_SSIDS | Access point | Number of responded SSIDs |
| _RECON_SELECTED_AP_SSID | Access point | Primary SSID (UTF-8) |
| _RECON_SELECTED_AP_HIDDEN | Access point | Is SSID hidden / decloaeked |
| _RECON_SELECTED_AP_CHANNEL | Access point | Advertised channel of AP |
| _RECON_SELECTED_AP_ENCRYPTION_TYPE | Access point | Advertised encryption of AP |
| _RECON_SELECTED_AP_CLIENT_COUNT | Access point | Number of detected clients on AP |
| _RECON_SELECTED_AP_BEACONED_SSID | Access point | Primary beaconed SSID |
| _RECON_SELECTED_AP_PROBED_SSID | Access point | Primary probed SSID |
| _RECON_SELECTED_AP_RESPONDED_SSID | Access point | Primary probe response SSID |
| _RECON_SELECTED_AP_MAC_ADDRESS | Access point | MAC address of AP |
| _RECON_SELECTED_AP_BSSID | Access point | MAC address of AP |
| _RECON_SELECTED_AP_TIMESTAMP | Access point | Time the AP was first seen |
| _RECON_SELECTED_AP_RSSI | Access point | Signal of AP |
| _RECON_SELECTED_AP_FREQ | Access point | Frequency |
| _RECON_SELECTED_AP_PACKETS | Access point | Number of packets as human-readable unit suffixes (100kK 100M, etc) |


Wi-Fi client payloads [link](#wi-fi-client-payloads)A Wi-Fi client payload is given the data about the selected access point, as well as the data about the selected client:


| Variable | Payload | Description |
|---|---|---|
| _RECON_SELECTED_CLIENT_OUI | Client | OUI / Manufacturer name lookup |
| _RECON_SELECTED_CLIENT_BEACONED_SSIDS | Client | Number of beaconed SSIDs (if client has also acted as an AP) |
| _RECON_SELECTED_CLIENT_PROBED_SSIDS | Client | Number of probed SSIDs |
| _RECON_SELECTED_CLIENT_RESPONDED_SSIDS | Client | Number of responded SSIDs (if client has also acted as an AP) |
| _RECON_SELECTED_CLIENT_BEACONED_SSID | Client | Primary beaconed SSID (if client has also acted as an AP) |
| _RECON_SELECTED_CLIENT_PROBED_SSID | Client | Primary probed SSID |
| _RECON_SELECTED_CLIENT_RESPONDED_SSID | Client | Primary probe response SSID (if client has also acted as an AP) |
| _RECON_SELECTED_CLIENT_MAC_ADDRESS | Client | MAC address of client |
| _RECON_SELECTED_CLIENT_TIMESTAMP | Client | Time the client was first seen |
| _RECON_SELECTED_CLIENT_RSSI | Client | Signal of client |
| _RECON_SELECTED_CLIENT_FREQ | Client | Frequency |
| _RECON_SELECTED_CLIENT_PACKETS | Client | Number of packets as human-readable unit suffixes |



    

    

    
                                            
                                            


	
	
		[navigate_before Alert Payloads](/wifi-pineapple-pager/payloads/alert-payloads/)
        
	
		[DuckyScript for the WiFi Pineapple Pager navigate_next](/wifi-pineapple-pager/payloads/duckyscript-for-the-wifi-pineapple-pager/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/duckyscript-for-the-wifi-pineapple-pager/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# DuckyScript for the WiFi Pineapple Pager


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        Payloads are scripts integrated with DuckyScript commands which leverage the power of the WiFi Pineapple system.


DuckyScript is the payload language of Hak5 gear.


Originating on the Hak5 USB Rubber Ducky as a standalone language, the Packet Squirrel uses DuckyScript commands to bring the ethos of easy-to-use actions to the payload language.


DuckyScript commands are always in all capital letters to distinguish them from other system or script language commands. Typically, they take a small number of options (or sometimes no options at all).


Payloads can be constructed of DuckyScript commands alone, or combined with the power of bash scripting and system commands to create fully custom, advanced actions.


DuckyScript commands themselves are often writen in bash as well, though some commands are provided as binaries to increase performance.



## Pager-specific DuckyScript commands link

Pager DuckyScript commands interact with the pager UI:  Use these to prompt the user to confirm actions, enter text, data, and addresses, make other selections, or just keep the user informed.


The majority of these commands must be run from inside a user or recon payload, since they take over the screen!


| DuckyScript command | Use | Details |
|---|---|---|
| ALERT | Raise a full-screen alert | Documentation |
| BATTERY_CHARGING | Return battery charging state | – |
| BATTERY_PERCENT | Return battery charging percentage | – |
| CONFIGURATION | Persistent configuration commands | Documentation |
| CONFIRMATION_DIALOG | Prompt the user with a yes or no confirmation | Documentation |
| DISABLE_DISPLAY | Turn off the Pager display | – |
| DPADLED_CONFIG | Configure the default DPAD LED color | – |
| ENABLE_DISPLAY | Turn the Pager display on | – |
| ERROR_DIALOG | Show the user error information | Documentation |
| IP_PICKER | Prompt the user to enter an IPv4 address | Documentation |
| LOG | Send text to the payload log | Documentation |
| MAC_PICKER | Prompt the user to enter a MAC address | Documentation |
| NUMBER_PICKER | Prompt the user to enter a numerical value | Documentation |
| PROMPT | Raise a modal alert and wait for the user to continue | Documentation |
| RINGTONE | Play a ringtone or ringtone file, with optional vibration | Documentation |
| START_SPINNER | Start an indefinite progress spinner | Documentation |
| STOP_SPINNER | Stop an indefinite progress spinner | Documentation |
| TEXT_PICKER | Prompt the user to enter free-form text | Documentation |
| VIBRATE | Activate the haptic vibration motor in sync with a ringtone file | Documentation |
| WAIT_FOR_BUTTON_PRESS | Wait for the user to press a physical button | Documentation |
| WAIT_FOR_INPUT | Wait for the user to press any physical button | Documentation |






## Pineapple-specific DuckyScript commands link

Pineapple DuckyScript commands interact with the WiFi Pineapple access point and recon functions: Use these to control Pineapple-specific configuration and functions.


| DuckyScript command | Use | Details |
|---|---|---|
| FIND_CLIENT_IP | Find the IP address of a client connected to a WiFi Pineapple access point | Documentation |
| GPS_CONFIGURE | Configure the serial port and speed of a USB GPS device | – |
| GPS_GET | Get the current GPS coordinates, if known | – |
| GPS_LIST | List available GPS serial ports | – |
| INSTALL_FIRMWARE | Validate and install an uploaded firmware | – |
| PINEAPPLE_DEAUTH_CLIENT | Deauthenticate a client from a Wi-Fi network | Documentation |
| PINEAPPLE_EXAMINE_BSSID | Stop channel hopping and lock to the channel used by a known access point | Documentation |
| PINEAPPLE_EXAMINE_CHANNEL | Stop channel hopping and lock to a channel | Documentation |
| PINEAPPLE_EXAMINE_RESET | Resume normal channel hopping | Documentation |
| PINEAPPLE_DEVICE_FILTER_ADD | Add a MAC address to the Pineapple AP device filters | Documentation |
| PINEAPPLE_DEVICE_FILTER_ADD_FILE | Add a list of MAC address in a file to the Pineapple AP device filters | Documentation |
| PINEAPPLE_DEVICE_FILTER_CLEAR | Delete all MAC addresses from the Pineapple AP device filters | Documentation |
| PINEAPPLE_DEVICE_FILTER_DEL | Delete a MAC address from the Pineapple AP device filters | Documentation |
| PINEAPPLE_DEVICE_FILTER_LIST | List MAC addresses in the Pineapple AP device filters | Documentation |
| PINEAPPLE_DEVICE_FILTER_MODE | Control Pineapple AP device filter mode | Documentation |
| PINEAPPLE_HOPPING_START | Resume recon channel hopping | – |
| PINEAPPLE_HOPPING_STOP | Stop recon channel hopping | – |
| PINEAPPLE_LOOT_ARCHIVE | Archive current loot (handshakes, pcap, wigle, and other loot) in a timestamped directory | – |
| PINEAPPLE_MIMIC_DISABLE | Disable open AP mimic mode | Documentation |
| PINEAPPLE_MIMIC_ENABLE | Enable open AP mimic mode | Documentation |
| PINEAPPLE_NETWORK_FILTER_ADD | Add a SSID to the Pineapple AP network filters | Documentation |
| PINEAPPLE_NETWORK_FILTER_ADD_FILE | Add a list of SSIDs in a file to the Pineapple AP network filters | Documentation |
| PINEAPPLE_NETWORK_FILTER_CLEAR | Delete all SSIDs from the Pineapple AP network filters | Documentation |
| PINEAPPLE_NETWORK_FILTER_DEL | Delete a SSID from the Pineapple AP network filters | Documentation |
| PINEAPPLE_NETWORK_FILTER_LIST | List SSIDs in the Pineapple AP network filters | Documentation |
| PINEAPPLE_NETWORK_FILTER_MODE | Control Pineapple AP network filter mode | Documentation |
| PINEAPPLE_RECON_NEW | Start a new recon session | Documentation |
| PINEAPPLE_SET_BANDS | Configure the Wi-Fi bands monitored by recon | Documentation |
| PINEAPPLE_SSID_POOL_ADD | Add a SSID to the Pineapple SSID impersonation pool | Documentation |
| PINEAPPLE_SSID_POOL_ADD_FILE | Add a list of SSIDs in a file to the Pineapple SSID impersonation pool | Documentation |
| PINEAPPLE_SSID_POOL_CLEAR | Clear the Pineapple SSID impersonation pool | Documentation |
| PINEAPPLE_SSID_POOL_COLLECT_START | Start automatic collection of probe requests in the Pineapple SSID impersonation pool | Documentation |
| PINEAPPLE_SSID_POOL_COLLECT_STOP | Stop automatic collection of the Pineapple SSID impersonation pool | Documentation |
| PINEAPPLE_SSID_POOL_DELETE | Delete a SSID from the Pineapple SSID impersonation pool | Documentation |
| PINEAPPLE_SSID_POOL_LIST | List the contents of the Pineapple SSID impersonation pool | Documentation |
| PINEAPPLE_SSID_POOL_START | Start advertising networks in the Pineapple SSID impersonation pool | Documentation |
| PINEAPPLE_SSID_POOL_STOP | Stop advertising networks in the Pineapple SSID impersonation pool | Documentation |
| WIFI_OPEN_AP | Configure the open access point | – |
| WIFI_OPEN_AP_CLEAR | Clear the open access point configuration | – |
| WIFI_OPEN_AP_DISABLE | Disable the open access point | – |
| WIFI_OPEN_AP_HIDE | Set the open access point to hidden | – |
| WIFI_PCAP_START | Start an optimized packet capture | Documentation |
| WIFI_PCAP_STOP | Stop packet capture | Documentation |
| WIFI_WPA_AP | Configure the WPA access point | – |
| WIFI_WPA_AP_CLEAR | Clear the WPA access point configuration | – |
| WIFI_WPA_AP_DISABLE | Disable the WPA access point | – |
| WIFI_WPA_AP_HIDE | Set the WPA access point to hidden | – |
| WIGLE_LOGIN | Fetch a Wigle login token | Documentation |
| WIGLE_LOGOUT | Remove Wigle API tokens | Documentation |
| WIGLE_START | Start a Wigle log | Documentation |
| WIGLE_STOP | Stop a Wigle log | Documentation |
| WIGLE_UPLOAD | Upload a Wigle log to the service | Documentation |



## Payload configuration commands link

Payload configuration DuckyScript commands store configuration values in the stanard UCI based configuration system.


| DuckyScript command | Use | Details |
|---|---|---|
| PAYLOAD_DEL_CONFIG | Delete a payload configuration value | – |
| PAYLOAD_GET_CONFIG | Get a payload configuration value | – |
| PAYLOAD_SET_CONFIG | Set a payload configuraton value | – |



## Wi-Fi configuration commands link

Configure Wi-Fi client mode and the management access point.


| DuckyScript command | Use | Details |
|---|---|---|
| WIFI_CLEAR | Clear client Wi-Fi mode configuration | – |
| WIFI_CONNECT | Connect to a Wi-Fi network as a client | – |
| WIFI_DISCONNECT | Disconnect from client mode Wi-Fi | – |
| WIFI_MGMT_AP | Configure the management access point | – |
| WIFI_MGMT_AP_CLEAR | Clear the management access point configuration | – |
| WIFI_MGMT_AP_DISABLE | Disable the management access point | – |
| WIFI_MGMT_AP_HIDE | Set the management access point to hidden | – |
| WIFI_WAIT | Wait for the client-mode Wi-Fi to connect | – |



## VPN configuration commands link

The WiFi Pineapple Pager supports the OpenVPN and Wireguard VPN protocols out of the box.


| DuckyScript command | Use | Details |
|---|---|---|
| OPENVPN_CONFIGURE | Provision an OpenVPN configuration | – |
| OPENVPN_DISABLE | Disable OpenVPN | – |
| OPENVPN_ENABLE | Enable OpenVPN | – |
| WIREGUARD_CONFIGURE | Configure the Wireguard VPN | – |
| WIREGUARD_DISABLE | Disable the Wireguard VPN | – |
| WIREGUARD_ENABLE | Enable the Wireguard VPN | – |



## AutoSSH commands link

AutoSSH maintains a standard SSH connection (with port forwarding).


| DuckyScript command | Use | Details |
|---|---|---|
| AUTOSSH_ADD_PORT | Add a port forward to AutoSSH | – |
| AUTOSSH_CLEAR | Clear AutoSSH configuration | – |
| AUTOSSH_CONFIGURE | Configure AutoSSH | – |
| AUTOSSH_DISABLE | Disable AutoSSH | – |
| AUTOSSH_ENABLE | Enable AutoSSH | – |
| SSH_ADD_KNOWN_HOST | Add a known SSH host | – |



## DNS Spoof commands link

Manipulate the local DNS server provided to clients of the Pineapple access points.


| DuckyScript command | Use | Details |
|---|---|---|
| DNSSPOOF_ADD_HOST | Add a host to DNS spoofing | – |
| DNSSPOOF_CLEAR | Clear DNS spoofing configuration | – |
| DNSSPOOF_DEL_HOST | Delete a host from DNS spoofing | – |
| DNSSPOOF_DISABLE | Disable DNS spoofing engine | – |
| DNSSPOOF_ENABLE | Enable DNS spoofing engine | – |



## Miscellaneous commands link

| DuckyScript command | Use | Details |
|---|---|---|
| LED | Change the LED | – |
| SYSTEM_DNS | Override the system DNS | – |



    

    

    
                                            
                                            


	
	
		[navigate_before Recon Payloads](/wifi-pineapple-pager/payloads/recon-payloads/)
        
	
		[ALERT navigate_next](/wifi-pineapple-pager/payloads/pager/alert/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/alert/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# ALERT


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        ALERT - Raise an alert mesage for the user



## When to use it link

ALERT displays a full-screen alert message at any time.  It can be called from
alert payloads - whenever an event requires the users attention, use ALERT!



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
ALERT [message]
```


  
message


Arbitrary text message presented to the user.  Message should be kept short enough to fit on the display.




    
        

        ![An alert](/wifi-pineapple-pager/images/payload/pager_payload/alert.png)


    
	
            
            An alert


        



## Results link

ALERT displays the requested text, and has no results.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
ALERT "Notice me!"
```


  

  
  
  warning
  
  
As of firmware 1.0.5, raising an alert always plays the configured alert ringtone.


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before DuckyScript for the WiFi Pineapple Pager](/wifi-pineapple-pager/payloads/duckyscript-for-the-wifi-pineapple-pager/)
        
	
		[CONFIG navigate_next](/wifi-pineapple-pager/payloads/pager/config/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/config/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use them

                                        
                                            
                                                
                                                *article*
                                                
                                                
# CONFIG


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        PAYLOAD_GET_CONFIG - Retrieve a permanent payload configuration option


PAYLOAD_SET_CONFIG - Set a permanent payload configuration option


PAYLOAD_DEL_CONFIG - Delete a permanent payload configuration option



## When to use them link

If your payload allows the user to set configuration options, using the PAYLOAD_XYZ_CONFIG commands offers a convenient way to save these options.  Configuration options saved this way will persist across firmware upgrades.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
PAYLOAD_GET_CONFIG [payload name] [option]
```


  
payload name


Simple name of the payload.  This must not contain spaces, and should be unique.  The payload name is used to distinguish between different payloads using the same variable name.


option


Option name to fetch.





  
  
  

  
  
  
  

  

  
  
```
PAYLOAD_SET_CONFIG [payload name] [option] [value]
```


  
payload name


Simple name of the payload.  This must not contain spaces, and should be unique.  The payload name is used to distinguish between different payloads using the same variable name.


option


Option name to set


value


Value to save





  
  
  

  
  
  
  

  

  
  
```
PAYLOAD_DEL_CONFIG [payload name] [option]
```


  
payload name


Simple name of the payload.  This must not contain spaces, and should be unique.  The payload name is used to distinguish between different payloads using the same variable name.


option


Option name to delete.



## Results link

PAYLOAD_GET_CONFIG returns the option value on the output of the command, and sets a return code of 0 on success and non-zero on failure.


PAYLOAD_SET_CONFIG sets a return code of 0 on success and non-zero on failure.  The most common cause for a failure to set a value is an illegal payload or option name.


PAYLOAD_DEL_CONFIG will never return an error - if a config value is not found, it is ignored.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
PAYLOAD_SET_CONFIG demopayload host "1.2.3.4"
```


  



  
  
  

  
  
  
  

  

  
  
```
# ignore an error, we don't care
__config_host=$(PAYLOAD_GET_CONFIG demopayload host)
__host=$(TEXT_PICKER "Hostname" "${__config_host}") || exit 0
```


  

  
  
  info
  
  
Remember to enclose your value in quotes!


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before ALERT](/wifi-pineapple-pager/payloads/pager/alert/)
        
	
		[CONFIRMATION_DIALOG navigate_next](/wifi-pineapple-pager/payloads/pager/confirmation_dialog/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/confirmation_dialog/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# CONFIRMATION_DIALOG


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        CONFIRMATION_DIALOG - Ask the user to confirm an action via the UI



## When to use it link

Use CONFIRMATION_DIALOG before taking a payload action which might take a long time, be intrusive, or otherwise should warn the user and give them a chance to cancel.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
CONFIRMATION_DIALOG ["text prompt"]
```


  
text prompt


Arbitrary text prompt to show to the user.  The text should be kept short enough to fit on the device display.




    
        

        ![An example confirmation dialog](/wifi-pineapple-pager/images/payload/pager_payload/confirmation-dialog.png)


    
	
            
            An example confirmation dialog


        



## Results link

CONFIRMATION_DIALOG will wait until the user has made a selection, pausing the payload.


CONFIRMATION_DIALOG prints a 1 if the user continues or 0 if the user cancels, and exits with an error code if the command fails.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
resp=$(CONFIRMATION_DIALOG "Continue the payload?") || exit 1
if [ "$resp" != "$DUCKYSCRIPT_USER_CONFIRMED" ]; then
    LOG "User cancelled!"
    exit 0
fi
```


  

  
  
  info
  
  
Remember to enclose the prompt text in quotes!


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before CONFIG](/wifi-pineapple-pager/payloads/pager/config/)
        
	
		[ERROR_DIALOG navigate_next](/wifi-pineapple-pager/payloads/pager/error_dialog/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/error_dialog/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# ERROR_DIALOG


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        ERROR_DIALOG - Show the user an error dialog via the UI



## When to use it link

Use ERROR_DIALOG to explain a failure in the payload.  The most common use would be to notify the user that an operation is not currently possible.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
ERROR_DIALOG [error text]
```


  
error text


Error text to show.  Text should be kept short enough to fit on the device display.




    
        

        ![An example error dialog](/wifi-pineapple-pager/images/payload/pager_payload/error-dialog.png)


    
	
            
            An example error dialog


        



## Results link

ERROR_DIALOG returns immediately after showing an error dialog; it should usually be the last thing called in a payload.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
ERROR_DIALOG "Something went wrong!" ; exit 0
```


  



  
  
  

  
  
  
  

  

  
  
```
CONFIRMATION_DIALOG "Continue?" || {
    ERROR_DIALOG "You said no..."
    exit 0
}
```


  

  
  
  info
  
  
Remember to enclose the prompt text in quotes!


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before CONFIRMATION_DIALOG](/wifi-pineapple-pager/payloads/pager/confirmation_dialog/)
        
	
		[IP_PICKER navigate_next](/wifi-pineapple-pager/payloads/pager/ip_picker/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/ip_picker/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# IP_PICKER


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        IP_PICKER - Ask the user to interactively enter an IP via the UI



## When to use it link

Whenever an IP address is needed, IP_PICKER supplies a custom keyboard optimized for IPv4 entry.  Providing a default IP address allows saved values to be presented to the user for faster selection.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
IP_PICKER [text prompt] [default ip]
```


  
text prompt


Text prompt to show the user.  Prompts should be kept short enough to display on the device screen.


default ip


Default IP address.




    
        

        ![The IP picker dialog](/wifi-pineapple-pager/images/payload/pager_payload/ip-picker-1.png)


    
	
            
            The IP picker dialog


        




    
        

        ![The IP picker editor](/wifi-pineapple-pager/images/payload/pager_payload/ip-picker-2.png)


    
	
            
            The IP picker editor


        



  
  
  warning
  
  
A default IP should typically be provided.  To prompt the user with no default, use a blank quoted string: "".


  
  

## Results link

IP_PICKER will wait until the user has made a selection, pausing the payload.


IP_PICKER exits with a return code of 0 if the user continues, and non-zero if the user cancels.


IP_PICKER returns the IP as the output.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
__userip=$(IP_PICKER "Target IP" "1.2.3.4") || exit 0
```


  



  
  
  

  
  
  
  

  

  
  
```
__userip=$(IP_PICKER "No default IP" "") || exit 0
```


  

  
  
  info
  
  
Remember to enclose the prompt text in quotes!


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before ERROR_DIALOG](/wifi-pineapple-pager/payloads/pager/error_dialog/)
        
	
		[LOG navigate_next](/wifi-pineapple-pager/payloads/pager/log/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/log/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# LOG


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        LOG - Send data to the payload console



## When to use it link

LOG is the primary way to show messages to the user about a paylaod in progress.  Use it communicating the state of the payload shouldn’t pause the payload or interrupt the user.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
LOG {color} [message]
```


  
color (optional)


Set the color of the log message.  The color may be any color name defined in the current theme.


message


Message to add to the payload log.




    
        

        ![Example logging](/wifi-pineapple-pager/images/payload/pager_payload/log.png)


    
	
            
            Example logging


        



## Results link

LOG sends a message to the payload console log, and returns immediately.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
LOG "Things are happening!"
LOG red "EXCITING things are happening!"
```


  

  
  
  info
  
  
Remember to enclose the log text in quotes!


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before IP_PICKER](/wifi-pineapple-pager/payloads/pager/ip_picker/)
        
	
		[MAC_PICKER navigate_next](/wifi-pineapple-pager/payloads/pager/mac_picker/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/mac_picker/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# MAC_PICKER


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        MAC_PICKER - Ask the user to interactively enter a MAC via the UI



## When to use it link

Use MAC_PICKER any time a payload needs a MAC address, such as for a client or a BSSID.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
MAC_PICKER [text prompt] [default mac]
```


  
text prompt


Text prompt shown to user.  Text prompts should be kept short enough to fit on the device display.


default mac


Default MAC address to pre-populate the picker.




    
        

        ![The IP picker dialog](/wifi-pineapple-pager/images/payload/pager_payload/mac-picker-1.png)


    
	
            
            The IP picker dialog


        




    
        

        ![The IP picker editor](/wifi-pineapple-pager/images/payload/pager_payload/mac-picker-2.png)


    
	
            
            The IP picker editor


        



  
  
  warning
  
  
A default MAC should typically be provided.  To prompt the user with no default, use a blank quoted string: "".


  
  

## Results link

MAC_PICKER will wait until the user has made a selection, pausing the payload.


MAC_PICKER exits with a return code of 0 if the user continues, and non-zero if the user cancels.


MAC_PICKER returns the MAC as the output.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
__userip=$(MAC_PICKER "Target MAC" "00:DE:AD:BE:EF:00") || exit 0
```


  



  
  
  

  
  
  
  

  

  
  
```
__userip=$(MAC_PICKER "No default MAC" "") || exit 0
```


  

  
  
  info
  
  
Remember to enclose the prompt text in quotes!


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before LOG](/wifi-pineapple-pager/payloads/pager/log/)
        
	
		[NUMBER_PICKER navigate_next](/wifi-pineapple-pager/payloads/pager/number_picker/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/number_picker/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# NUMBER_PICKER


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        NUMBER_PICKER - Ask the user to interactively enter a number via the UI



## When to use it link

NUMBER_PICKER presents an optimized numerical keyboard whenever a payload needs a number, such as a port or a flexible timeout value.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
NUMBER_PICKER [text prompt] [default number]
```


  
text prompt


Text prompt to show the user.  Prompts should be kept short enough to fit on the device display.


default number


Default number for the picker.




    
        

        ![The number picker dialog](/wifi-pineapple-pager/images/payload/pager_payload/number-picker-1.png)


    
	
            
            The number picker dialog


        




    
        

        ![The number picker editor](/wifi-pineapple-pager/images/payload/pager_payload/number-picker-2.png)


    
	
            
            The number picker editor


        



  
  
  warning
  
  
A default number should typically be provided.  To prompt the user with no default, use a blank quoted string: "".


  
  

## Results link

NUMBER_PICKER will wait until the user has made a selection, pausing the payload.


NUMBER_PICKER exits with a return code of 0 if the user continues, and non-zero if the user cancels.


NUMBER_PICKER returns the number as the output.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
__usernum=$(NUMBER_PICKER "Timeout (in seconds)" "5") || exit 0
```


  



  
  
  

  
  
  
  

  

  
  
```
__usernum=$(NUMBER_PICKER "No default number" "") || exit 0
```


  

  
  
  info
  
  
Remember to enclose the prompt text in quotes!


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before MAC_PICKER](/wifi-pineapple-pager/payloads/pager/mac_picker/)
        
	
		[PROMPT navigate_next](/wifi-pineapple-pager/payloads/pager/prompt/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/prompt/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# PROMPT


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        PROMPT - Raise a modal dialog and wait for the user to dismiss it



## When to use it link

Use PROMPT any time the payload should be paused and the user given information.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
PROMPT [message]
```


  
message


Text to display to the user.  Messages should be kept short enough to fit on the device display.




    
        

        ![The IP picker dialog](/wifi-pineapple-pager/images/payload/pager_payload/prompt.png)


    
	
            
            The IP picker dialog


        



## Results link

PROMPT will wait until the user has confirmed, pausing the payload.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
PROMPT "The user should know about this..."
```


  

  
  
  info
  
  
Remember to enclose the prompt text in quotes!


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before NUMBER_PICKER](/wifi-pineapple-pager/payloads/pager/number_picker/)
        
	
		[RINGTONE navigate_next](/wifi-pineapple-pager/payloads/pager/ringtone/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/ringtone/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# RINGTONE


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        RINGTONE - Play a ringtone or ringtone file.  A ringtone is a RTTTL format monophonic series of notes.



## When to use it link

Use RINGTONE to play a custom (or system) ringtone sound, with optional vibration.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
RINGTONE {--vibrate} [rtttl - or - filename]
```


  
–vibrate (optional)


Vibrate in sync with the ringtone


rtttl or filename


Play the supplied RTTTL ringtone, or play a RTTTL file.


To play a custom ringtone, use the entire RTTTL ringtone as an argument.


To play a ringtone file, pass the name of the file. Ringtones are automatically played from /root/ringtones/.



## Results link

RINGTONE will exit with an error if another ringtone is currently playing.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
# Play the default `alert.rtttl` ringtone, with vibration
RINGTONE --vibrate "alert"
```


  



  
  
  

  
  
  
  

  

  
  
```
# Play a custom ringtone
RINGTONE "custom:d=16,o=4,b=200:8e4,8g4,8a#4,8d5,8b6"
```


  

  
  
  info
  
  
Remember to enclose the RTTTL content in quotes!


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before PROMPT](/wifi-pineapple-pager/payloads/pager/prompt/)
        
	
		[SPINNER navigate_next](/wifi-pineapple-pager/payloads/pager/spinner/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/spinner/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use them

                                        
                                            
                                                
                                                *article*
                                                
                                                
# SPINNER


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        START_SPINNER - Show an indeterminate spinner indicating a long-running task is running


STOP_SPINNER - Cancel a spinner



## When to use them link

Use START_SPINNER before any payload action which may take a long time - for instance a network scan.  Spinners let the user know that something is still happening, even if it takes a while.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
START_SPINNER [message]
```


  
message


Message to display while the spinner is active.  Messages should be kept short enough to fit on the device display.




    
        

        ![A spinner](/wifi-pineapple-pager/images/payload/pager_payload/spinner.png)


    
	
            
            A spinner


        



  
  
  warning
  
  
In firmware 1.0.4 or older, the spinner message should be a single word.  Using a multi-word prompt will unfortunately make a spinner which can not be cancelled.


This is fixed as of 1.0.5 - use any spinner title you like!


  
  



  
  
  

  
  
  
  

  

  
  
```
STOP_SPINNER [spinner id]
```


  
The spinner id returned by START_SPINNER must be provided to cancel a running spinner.



## Results link

START_SPINNER returns the ID of the spinner.  You must capture this to cancel the spinner!



## Examples link




  
  
  

  
  
  
  

  

  
  
```
__spinnerid=$(START_SPINNER "Thinking")
sleep 5
STOP_SPINNER ${__spinnerid}
```


  

    

    

    
                                            
                                            


	
	
		[navigate_before RINGTONE](/wifi-pineapple-pager/payloads/pager/ringtone/)
        
	
		[TEXT_PICKER navigate_next](/wifi-pineapple-pager/payloads/pager/text_picker/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/text_picker/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# TEXT_PICKER


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        TEXT_PICKER - Ask the user to interactively enter text via the UI



## When to use it link

Any time text is required - such as a host name or user name.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
TEXT_PICKER [text prompt] [default text]
```


  
text prompt


Prompt to show the user.  Prompts should be kept short enough to fit on the device display.


default text


Default value to populate the picker.




    
        

        ![The text picker dialog](/wifi-pineapple-pager/images/payload/pager_payload/text-picker-1.png)


    
	
            
            The text picker dialog


        




    
        

        ![The text picker editor](/wifi-pineapple-pager/images/payload/pager_payload/text-picker-2.png)


    
	
            
            The text picker editor


        



  
  
  warning
  
  
Default text should typically be provided.  To prompt the user with no default, use a blank quoted string: "".


  
  

## Results link

TEXT_PICKER will wait until the user has made a selection, pausing the payload.


TEXT_PICKER exits with a return code of 0 if the user continues, and non-zero if the user cancels.


TEXT_PICKER returns the text as the output.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
__host=$(TEXT_PICKER "Target hostname" "foo-client") || exit 0
```


  



  
  
  

  
  
  
  

  

  
  
```
__demo=$(TEXT_PICKER "No default text" "") || exit 0
```


  

  
  
  info
  
  
Remember to enclose the prompt text in quotes!


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before SPINNER](/wifi-pineapple-pager/payloads/pager/spinner/)
        
	
		[VIBRATE navigate_next](/wifi-pineapple-pager/payloads/pager/vibrate/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/vibrate/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# VIBRATE


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        VIBRATE - Play a ringtone or ringtone file as vibration. A ringtone is a RTTTL format monophonic series of notes.



## When to use it link

Use VIBRATE to play a custom (or system) ringtone pattern, with vibration only.


Vibration patterns are controlled as if they were ringtones - when a note would play, the vibration motor is triggered.  This can be used to introduce complex patterns of vibration, or used as a simple on/off pulse.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
VIBRATE [rtttl - or - filename]
```


  
rtttl or filename


Play the supplied RTTTL ringtone, or play a RTTTL file.


To play a custom ringtone, use the entire RTTTL ringtone as an argument.


To play a ringtone file, pass the name of the file. Ringtones are automatically played from /root/ringtones/.



## Results link

VIBRATE will exit with an error if another ringtone or vibration is currently playing.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
# Play the default `alert.rtttl` ringtone as vibration
VIBRATE "alert"
```


  



  
  
  

  
  
  
  

  

  
  
```
# Play a custom ringtone as vibration
VIBRATION "custom:d=16,o=4,b=200:8e4,8g4,8a#4,8d5,8b6"
```


  

  
  
  info
  
  
Remember to enclose the RTTTL content in quotes!


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before TEXT_PICKER](/wifi-pineapple-pager/payloads/pager/text_picker/)
        
	
		[BUTTON_PRESS navigate_next](/wifi-pineapple-pager/payloads/pager/button_press/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pager/button_press/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use them

                                        
                                            
                                                
                                                *article*
                                                
                                                
# BUTTON_PRESS


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        WAIT_FOR_BUTTON_PRESS - Wait for the user to press a physical button


WAIT_FOR_INPUT - Wait for the user to press any physical button, returning the button pressed



## When to use them link

Use WAIT_FOR_BUTTON_PRESS after prompting the user to press a specific key (such as via LOG), or use WAIT_FOR_INPUT after prompting the user to press any key to continue.


Both offer a way to pause execution of a payload until the user takes action, without opening a full dialog.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
WAIT_FOR_BUTTON_PRESS [button]
```


  
button


Button user must press to continue.


Supported buttons are ANY, A, B, UP, DOWN, LEFT, RIGHT





  
  
  

  
  
  
  

  

  
  
```
WAIT_FOR_INPUT
```


  

## Results link

WAIT_FOR_BUTTON_PRESS will wait until the user has pressed the requested button, pausing the payload.


WAIT_FOR_INPUT will wait until the user has pressed any button, pausing the payload.


WAIT_FOR_INPUT returns the button pressed.  The button will be one of A, B, UP, DOWN, LEFT, RIGHT



## Examples link




  
  
  

  
  
  
  

  

  
  
```
LOG "Press 'A' to continue!"
WAIT_FOR_BUTTON_PRESS A
```


  



  
  
  

  
  
  
  

  

  
  
```
LOG "Press any button to continue!"
__button=$(WAIT_FOR_INPUT)
```


  

    

    

    
                                            
                                            


	
	
		[navigate_before VIBRATE](/wifi-pineapple-pager/payloads/pager/vibrate/)
        
	
		[FIND_CLIENT_IP navigate_next](/wifi-pineapple-pager/payloads/pineapple/find_client_ip/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pineapple/find_client_ip/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# FIND_CLIENT_IP


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        FIND_CLIENT_IP - Search ARP and DHCP records for an associated clients IP



## When to use it link

Use FIND_CLIENT_IP after a client has associated to a Pineapple access point (such as Open or EvilWPA) to search for the IP address in use by the client.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
FIND_CLIENT_IP [mac] {timeout}
```


  
mac


MAC address of the client, in normal xx:xx:xx:xx:xx:xx form.


timeout (optional)


Number of seconds to continue looking for an IP.



## Results link

FIND_CLIENT_IP returns the IP as output.  It exists with a return code of 0 on success and non-zero on failure.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
__ip=$(FIND_CLIENT_IP 00:DE:AD:BE:EF:01) || exit 0
```


  

    

    

    
                                            
                                            


	
	
		[navigate_before BUTTON_PRESS](/wifi-pineapple-pager/payloads/pager/button_press/)
        
	
		[DEAUTH_CLIENT navigate_next](/wifi-pineapple-pager/payloads/pineapple/deauth_client/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pineapple/deauth_client/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# DEAUTH_CLIENT


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        DEAUTH_CLIENT - Attempt to deauthenticate clients by sending spoofed deauthentication and disassociation packets.



## When to use it link

Use DEAUTH_CLIENT as part of an engagement when attempting to direct clients to a Pineapple access point or when harvesting handshakes.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
FIND_CLIENT_IP [bssid] [target] [channel]
```


  
bssid


BSSID (MAC address) of the access point, in the format xx:xx:xx:xx:xx:xx.


target


MAC address of the target client (or FF:FF:FF:FF:FF:FF for all clients) to attempt to disconnect.


channel


Channel to perform the disconnect on.



## Results link

DEAUTH_CLIENT returns immediately.  In the background, the PineAP system will attempt to disconnect clients.



## Limitations link

DEAUTH_CLIENT can be used on 2.4GHz channels, and on 5GHz channels which are not DFS channels.  DFS channels have stronger regulatory requirements which prohibit transmission.  Networks on 6GHz must utilize WPA3 features which prevent injected deauthentication packets.


Networks which utilize Protected Management Frames (PMF) or the 802.11w standard will not be susceptible to injected disconnection packets.  All networks utilizing WPA3 also enable Protected Management Frames.


Some clients ignore disconnection attempts deliberately regardless of the network type or channel.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
DEAUTH_CLIENT 00:AA:BB:CC:DD:EE 00:DE:AD:BE:EF:44 6
```


  

  
  
  warning
  
  
Be sure to only trigger client deauthentication against networks that are in the scope of your engagement!


Deauthenticating clients from networks which aren’t yours and which you haven’t been given permission to test isn’t only a jerk move, it may be illegal in some jurisdictions. Know the laws of your region!


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before FIND_CLIENT_IP](/wifi-pineapple-pager/payloads/pineapple/find_client_ip/)
        
	
		[DEVICE_FILTER navigate_next](/wifi-pineapple-pager/payloads/pineapple/device_filter/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pineapple/device_filter/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# DEVICE_FILTER


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        PINEAPPLE_DEVICE_FILTER_ADD - add a MAC address to a Pineapple device filter list


PINEAPPLE_DEVICE_FILTER_ADD_FILE - add a list of MAC addresses in a file to a Pineapple device filter list


PINEAPPLE_DEVICE_FILTER_DELETE - delete a MAC address from a Pineapple device filter list


PINEAPPLE_DEVICE_FILTER_CLEAR - clear a Pineapple device filter list


PINEAPPLE_DEVICE_FILTER_LIST - show a Pineapple device filter list


PINEAPPLE_DEVICE_FILTER_MODE - set the Pineapple device filter mode



  
  
  info
  
  
Previously, these commands were named PINEAPPLE_MAC_FILTER_...; they have been updated to match the terms used in the UI more consistently.  The old commands still work, though!


  
  

## When to use them link

The Pineapple device filter system defines the scope of an engagement by controlling what devices are allowed to connect to a Pineapple access point.


The PINEAPPLE_DEVICE_FILTER_... commands provide a scriptable interface to manipulating the filter lists.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_DEVICE_FILTER_ADD [list] [mac] {mac2 ... macN}
```


  
list (allow or deny)


Add one or more MAC addresses to the allow or deny device filter list


MAC address


MAC address to add to the filter list, in xx:xx:xx:xx:xx:xx format.





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_DEVICE_FILTER_ADD_FILE [list] [file]
```


  
list (allow or deny)


Add one or more MAC addresses to the allow or deny device filter list


file


File containing one or more MAC adresses, one MAC per line.





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_DEVICE_FILTER_DELETE [list] [mac] {mac2 ... macN}
```


  
list (allow or deny)


Delete one or more MAC addresses from the allow or deny filter list


MAC address


MAC address to delete from the filter list, in xx:xx:xx:xx:xx:xx format.





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_DEVICE_FILTER_CLEAR [list]
```


  
list (allow or deny)


Clear the specified device filter list (allow or deny list)





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_DEVICE_FILTER_LIST [list]
```


  
list (allow or deny)


Filter list to display the contents of (allow or deny)





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_DEVICE_FILTER_MODE [mode]
```


  
mode (allow or deny)


Set the operational mode of the device filter (allow or deny)



## Results link

Changes to the Pineapple device filter list are enacted immediately.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_MIMIC_DISABLE # disable openap mimic while we change lists
PINEAPPLE_DEVICE_FILTER_CLEAR allow
PINEAPPLE_DEVICE_FILTER_ADD allow 00:DE:AD:BE:EF:05
PINEAPPLE_DEVICE_FILTER_ADD allow 01:FE:ED:FA:CE:99
PINEAPPLE_DEVICE_FILTER_MODE allow
PINEAPPLE_MIMIC_ENABLE # re-enable mimic
```


  

    

    

    
                                            
                                            


	
	
		[navigate_before DEAUTH_CLIENT](/wifi-pineapple-pager/payloads/pineapple/deauth_client/)
        
	
		[EXAMINE navigate_next](/wifi-pineapple-pager/payloads/pineapple/examine/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pineapple/examine/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use them

                                        
                                            
                                                
                                                *article*
                                                
                                                
# EXAMINE


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        PINEAPPLE_EXAMINE_BSSID - stop channel hopping and examine the channel of a known access point


PINEAPPLE_EXAMINE_CHANNEL - stop channel hopping and examine a channel


PINEAPPLE_EXAMINE_RESET - resume channel hopping



## When to use them link

Normally, the recon engine hops between Wi-Fi channels to build a view of the Wi-Fi environment.


To build a more detailed view of a single channel - for instance to identify more clients on an access point of interest, or to attempt to capture handshakes from a specific AP - use the EXAMINE commands.


An EXAMINE command can examine for a fixed amount of time, or indefinitely. Use PINEAPPLE_EXAMINE_RESET to return to channel hopping mode.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_EXAMINE_BSSID [bssid] {time}
```


  
bssid


BSSID (MAC address) of the access point, in the format xx:xx:xx:xx:xx:xx.


time (optional)


Time (in seconds) to stay locked to a channel.





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_EXAMINE_CHANNEL [channel] {time}
```


  
channel


Wi-Fi channel


time (optional)


Time (in seconds) to stay locked to a channel.



## Results link

EXAMINE commands return immediately.  In the background, the PineAP system will set the new channel and wait the amount of time requested (or until a PINEAPPLE_EXAMINE_RESET command is sent).



## Examples link




  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_EXAMINE_BSSID 00:AA:BB:CC:DD:EE 10
```


  



  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_EXAMINE_CHANNEL 36
# do some stuff
PINEAPPLE_EXAMINE_RESET
```


  

    

    

    
                                            
                                            


	
	
		[navigate_before DEVICE_FILTER](/wifi-pineapple-pager/payloads/pineapple/device_filter/)
        
	
		[RECON_NEW navigate_next](/wifi-pineapple-pager/payloads/pineapple/recon_new/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pineapple/recon_new/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# RECON_NEW


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        PINEAPPLE_RECON_NEW - start a new recon session



## When to use it link

The Pineapple Recon engine organizes recon data into sessions.  By default, a new session is started on each boot.  Use PINEAPPLE_RECON_NEW to start a new session manually.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_RECON_NEW {name}
```


  
name (optional)


Set the name of this recon session.



  
  





  
Recon sessions will be further utilized in future firmware updates!


  
  

## Results link

A new recon session is started immediately.  Starting a new recon session also starts a new pcap log and Wigle log, if they are running.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_RECON_NEW "scripted"
```


  

    

    

    
                                            
                                            


	
	
		[navigate_before EXAMINE](/wifi-pineapple-pager/payloads/pineapple/examine/)
        
	
		[SET_BANDS navigate_next](/wifi-pineapple-pager/payloads/pineapple/set_bands/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pineapple/set_bands/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use it

                                        
                                            
                                                
                                                *article*
                                                
                                                
# SET_BANDS


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        PINEAPPLE_SET_BANDS - set the Wi-Fi bands for Recon channel hopping



## When to use it link

The Pineapple Recon engine hops between channels to build a view of the entire Wi-Fi spectrum.  Channels are organized into bands (2.4GHz, 5GHz, and 6GHz).  Disabling bands will increase the rate the channels on the remaining bands are monitored.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_SET_BANDS [interface] {2} {5} {6}
```


  
interface


Interface to apply the band selection to.  Typically this is wlan1mon - the tri-band monitor radio in the Pager.


2 (optional)


Enable the 2.4GHz band


5 (optional)


Enable the 5GHz band


6 (optional)


Enable the 6GHz band



## Results link

The band selection is changed immediately.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_SET_BANDS wlan1mon 2
```


  



  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_SET_BANDS wlan1mon 2 5 6
```


  

    

    

    
                                            
                                            


	
	
		[navigate_before RECON_NEW](/wifi-pineapple-pager/payloads/pineapple/recon_new/)
        
	
		[MIMIC navigate_next](/wifi-pineapple-pager/payloads/pineapple/mimic/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pineapple/mimic/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use them

                                        
                                            
                                                
                                                *article*
                                                
                                                
# MIMIC


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        PINEAPPLE_MIMIC_DISABLE - Disable mimic mode on the Pineapple Open AP


PINEAPPLE_MIMIC_ENABLE - Enable mimic mode on the Pineapple Open AP



  
  
  info
  
  
These commands were added in the WiFi Pineapple Pager 1.0.5 firmware.


  
  

## When to use them link

Mimic mode allows the Pineapple to respond for multiple network names from a single AP.


Combined with filters, mimic mode is a core method for capturing clients.


These commands are very useful for controlling the behavior of the open access point while configuring filters.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_MIMIC_DISABLE
```


  
Immediately disable accepting connections for mimic SSIDs on the Pineapple Open AP.





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_MIMIC_ENABLE
```


  
Immediately enable accepting connections for mimic SSIDs on the Pineapple Open AP.



    

    

    
                                            
                                            


	
	
		[navigate_before SET_BANDS](/wifi-pineapple-pager/payloads/pineapple/set_bands/)
        
	
		[NETWORK_FILTER navigate_next](/wifi-pineapple-pager/payloads/pineapple/network_filter/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pineapple/network_filter/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# NETWORK_FILTER


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        PINEAPPLE_NETWORK_FILTER_ADD - add a SSID to a Pineapple network filter list


PINEAPPLE_NETWORK_FILTER_ADD_FILE - add a list of SSIDs from a file to a Pineapple network filter list


PINEAPPLE_NETWORK_FILTER_DELETE - delete a SSID from a Pineapple network filter list


PINEAPPLE_NETWORK_FILTER_CLEAR - clear a Pineapple network filter list


PINEAPPLE_NETWORK_FILTER_LIST - show a Pineapple network filter list


PINEAPPLE_NETWORK_FILTER_MODE - set the Pineapple network filter mode



  
  
  info
  
  
Previously, these commands were named PINEAPPLE_SSID_FILTER_...; they have been updated to match the terms used in the UI more consistently.  The old commands still work, though!


  
  

## When to use them link

The Pineapple network filter system defines the scope of an engagement by controlling what SSIDs are impersonated by a Pineapple access point.


The PINEAPPLE_NETWORK_FILTER_ commands provide a scriptable interface to manipulating the filter lists.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_NETWORK_FILTER_ADD [list] [ssid] {ssid2 ... ssidN}
```


  
list (allow or deny)


Add a SSID to the allow or deny network filter list


ssid


One or more SSIDs to add to the filter list.  If the SSID contains special characters or spaces, be sure to enclose it in quotes!





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_NETWORK_FILTER_ADD_FILE [list] [file]
```


  
list (allow or deny)


Add the SSIDs to the allow or deny network filter list


file


A file containing one or more SSIDs, one SSID per line.





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_NETWORK_FILTER_DELETE [list] [ssid] {ssid2 ... ssidN}
```


  
list (allow or deny)


Delete a SSID from the allow or deny network filter list


ssid


One or more SSIDs to delete from the filter list.  If the SSID contains special characters or spaces, be sure to enclose it in quotes!





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_NETWORK_FILTER_CLEAR [list]
```


  
list (allow or deny)


Clear the specified network filter list (allow or deny list)





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_NETWORK_FILTER_LIST [list]
```


  
list (allow or deny)


Filter list to display the contents of (allow or deny)





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_NETWORK_FILTER_MODE [mode]
```


  
mode (allow or deny)


Set the operational mode of the network filter (allow or deny)



## Results link

Changes to the Pineapple network filter list are enacted immediately.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_MIMIC_DISABLE # disable mimic mode while we change the lists
PINEAPPLE_NETWORK_FILTER_CLEAR allow
PINEAPPLE_NETWORK_FILTER_ADD allow "Free Wi-Fi"
PINEAPPLE_NETWORK_FILTER_ADD allow "HP Setup"
PINEAPPLE_NETWORK_FILTER_MODE allow
PINEAPPLE_MIMIC_ENABLE # enable mimic mode
```


  

    

    

    
                                            
                                            


	
	
		[navigate_before MIMIC](/wifi-pineapple-pager/payloads/pineapple/mimic/)
        
	
		[SSID_POOL navigate_next](/wifi-pineapple-pager/payloads/pineapple/ssid_pool/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pineapple/ssid_pool/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# SSID_POOL


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        PINEAPPLE_SSID_POOL_ADD - add a SSID to a Pineapple SSID impersonation pool


PINEAPPLE_SSID_POOL_ADD_FILE - add multiple SSIDs from a file the Pineapple SSID impersonation pool


PINEAPPLE_SSID_POOL_DELETE - delete a SSID from the Pineapple SSID impersonation pool


PINEAPPLE_SSID_POOL_CLEAR - clear the Pineapple SSID impersonation pool


PINEAPPLE_SSID_POOL_LIST - show a Pineapple SSID impersonation pool


PINEAPPLE_SSID_POOL_COLLECT_START - start automatic SSID collection mode


PINEAPPLE_SSID_POOL_COLLECT_STOP - stop automatic SSID collection mode


PINEAPPLE_SSID_POOL_START - start advertising SSIDs from the impersonation pool


PINEAPPLE_SSID_POOL_STOP - stop advertising SSIDs from the impersonation pool



## When to use them link

The Pineapple SSID impersonation pool is a mechanism to entice clients to attempt connecting to a Pineapple Open access point with mimicry enabled.


Use the PINEAPPLE_SSID_POOL_ to manipulate the behavior of the SSID impersonation from a payload or command line.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_SSID_POOL_ADD [ssid] {ssid2 ... ssidN}
```


  
ssid


One or more SSIDs to add to the impersonation pool.  If the SSID contains special characters or spaces, be sure to use quotes!





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_SSID_POOL_ADD_FILE [file]
```


  
file


File containing one or more SSIDs, one SSID per line, to add to the SSID pool.





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_SSID_POOL_DELETE [ssid] {ssid2 ... ssidN}
```


  
ssid


One or moree SSIDs to delete from the advertisement pool.  If the SSID contains special characters or spaces, be sure to use quotes!





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_SSID_POOL_CLEAR
```


  
Clear the SSID pool





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_SSID_POOL_LIST
```


  
List the contents of the SSID pool





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_SSID_POOL_COLLECT_START
```


  
Start collecting SSIDs from probe requests, adding them to the SSID pool automatically.





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_SSID_POOL_COLLECT_STOP
```


  
Stop automatic collection of SSIDs in probe requests.





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_SSID_POOL_START {randomize}
```


  
randomize (optional)


Randomize (true) the impersonated BSSID of the advertised network, or use the BSSID of the Pineapple Open access point (false).


Many clients will not successfully connect to the Pineapple Open access point if a random BSSID is used; however, some clients will request any AP with the advertised SSID.





  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_SSID_POOL_STOP
```


  
Stop advertising the SSID pool.



## Results link

PINEAPPLE_SSID_POOL_START requires that the Pineapple Open AP is enabled and Mimicry mode is turned on, and will exit with an error code if they are not.



## Examples link




  
  
  

  
  
  
  

  

  
  
```
PINEAPPLE_SSID_POOL_STOP
PINEAPPLE_SSID_POOL_CLEAR
PINEAPPLE_SSID_POOL_ADD "Random Network"
PINEAPPLE_SSID_POOL_ADD "Free Public Wi-Fi"
PINEAPPLE_SSID_POOL_START
```


  

    

    

    
                                            
                                            


	
	
		[navigate_before NETWORK_FILTER](/wifi-pineapple-pager/payloads/pineapple/network_filter/)
        
	
		[WIFI_PCAP navigate_next](/wifi-pineapple-pager/payloads/pineapple/wifi_pcap/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pineapple/wifi_pcap/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            When to use them

                                        
                                            
                                                
                                                *article*
                                                
                                                
# WIFI_PCAP


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        WIFI_PCAP_START - start an optimized pcap log of Wi-Fi packets


WIFI_PCAP_STOP - stop a running pcap log



## When to use them link

A pcap log file gives a standard record of packets seen.


The Pineapple Recon engine can automatically make an optimized pcap log.  Using in-kernel filtering, the Recon system minimizes the extraneous data captured in a pcap capture, trimming data packets and other content.


Use the tcpdump tool to take a complete, unfiltered pcap directly from an interface.



## Syntax link




  
  
  

  
  
  
  

  

  
  
```
WIFI_PCAP_START
```


  
Start a pcap capture





  
  
  

  
  
  
  

  

  
  
```
WIFI_PCAP_STOP
```


  
Stop a pcap capture



## Results link

WIFI_PCAP_START will return the filename of the pcap log



    

    

    
                                            
                                            


	
	
		[navigate_before SSID_POOL](/wifi-pineapple-pager/payloads/pineapple/ssid_pool/)
        
	
		[WIGLE navigate_next](/wifi-pineapple-pager/payloads/pineapple/wigle/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/payloads/pineapple/wigle/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# WIGLE


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        WIGLE_LOGIN - log into a Wigle account and obtain an API key


WIGLE_LOGOUT - delete any saved API keys


WIGLE_UPLOAD - upload Wigle csv logs to the Wigle service


WIGLE_START - Start a new log file


WIGLE_STOP - Stop logging



## When to use them link

Wigle is a service for collecting wardriving logs.  Coupled with a GPS, the Pager can generate Wigle-compatible logs, and with a network connection with Internet access, upload them directly to the Wigle service.



  
  
  info
  
  
Please remember: Hak5 is not officially affiliated with Wigle.  Accounts you create and information you share with Wigle are subject to the Wigle End User Agreement.  The WiFi Pineapple Pager will never automatically interact with Wigle - even when creating a Wigle log file - unless you log into a Wigle account and choose to upload using the DuckyScript commands or a payload.


  
  

## Syntax link




  
  
  

  
  
  
  

  

  
  
```
WIGLE_LOGIN {username} {password}
```


  
username (optional)


An existing Wigle username


password (optional)


Password for the Wigle user


If a username and password are not provided as command line arguments, then WIGLE_LOGIN will offer an interactive login where the user is prompted to enter the username and password.


Interactive mode is typically not appropriate for use in payloads.


The API key of the login is saved to the payload config.





  
  
  

  
  
  
  

  

  
  
```
WIGLE_LOGOUT
```


  
Delete any saved API keys, logging out of the Wigle service.





  
  
  

  
  
  
  

  

  
  
```
WIGLE_UPLOAD {--archive} {--remove} [path to file] ... [path to fileN]
```


  
–archive


If --archive is used, WIGLE_UPLOAD will automatically move the file to the loot archive (/root/loot/archive/wigle/) directory after uploading.


–remove


If --remove is used, WIGLE_UPLOAD will automatically remove the file after uploading.


path-to-file


One or more files to upload; use the complete path (such as /root/loot/wigle/* to upload all files in the Wigle loot directory).





  
  
  

  
  
  
  

  

  
  
```
WIGLE_START
```


  
Start a Wigle log, or start a new Wigle log if logging is already enabled.





  
  
  

  
  
  
  

  

  
  
```
WIGLE_STOP
```


  
Stop and close a Wigle log



## Results link

The LOGIN and UPLOAD commands require an active Internet connection to interact with the online service, and will return an error if one is not available.


The WIGLE_LOGIN command will return an error if there is an issue logging in using the supplied username or password.


WIGLE_START returns the name of the Wigle log file created.


A Wigle log may be created without a physical GPS receiver, or without a valid GPS position lock, however it will remain empty until a GPS position is found.



    

    

    
                                            
                                            


	
	
		[navigate_before WIFI_PCAP](/wifi-pineapple-pager/payloads/pineapple/wifi_pcap/)
        
	
		[Factory Reset navigate_next](/wifi-pineapple-pager/recovery/factory-reset/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/recovery/factory-reset/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Factory reset

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Factory Reset


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        
## Factory reset link

The WiFi Pineapple Pager can be factory reset to the stock version of the current firmware installed on the device.


Performing a factory reset removes all configuration, settings, captured handshakes, custom themes, stored loot, payloads, and all other data from the device, and returns it to a like-new state.



## Performing a factory reset link

To perform a factory reset:



- Ensure the WiFi Pineapple Pager is powered off

- Hold down the ‘B’ button (the left-most red button)

- Power on the WiFi Pineapple pager, keeping the ‘B’ button held down

- Continue holding the ‘B’ button until the factory reset screen appears (approximately 30 seconds)

- Release the button when the factory reset screen appears, then make a selection using the ‘B’ button to cancel or the ‘A’ (green right-hand button) to continue



When prompted to make a selection on the factory reset screen, pressing the ‘B’ button (red) will cancel the factory reset process and continue booting normally.  Pressing the ‘A’ button (green) will begin the factory reset process immediately.


Once started, the factory reset process will take approximately 15 minutes to completely reset the device.  During this time, the red and green LEDs will blink.


Be sure you wish to remove all data from the device before confirming the factory reset process.  Once started, the factory reset can not be stopped, and data can not be recovered.



  
  
  warning
  
  
Once the ‘A’ button is pressed and the factory reset begins, it can not be cancelled and data can not be recovered.  Be sure you wish to remove all data from your device.


  
  

    

    

    
                                            
                                            


	
	
		[navigate_before WIGLE](/wifi-pineapple-pager/payloads/pineapple/wigle/)
        
	
		[Firmware Recovery navigate_next](/wifi-pineapple-pager/recovery/firmware-recovery/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/recovery/firmware-recovery/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            Firmware recovery

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Firmware Recovery


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        
## Firmware recovery link

For almost all situations, a factory reset should be sufficient for recovering a device.


However, if a factory reset is not possible, or a flash error occurs such that a device can not be upgraded or booted to the factory recovery screen, the WiFi Pineapple Pager also includes a very low-level firmware recovery system.



## Performing a firmware recovery flash link

To perform a firmware recovery flash you will need a desktop or laptop computer, a data capable USB-C cable, and a copy of the WiFi Pineapple Pager firmware downloaded from the Hak5 Download Portal; the firmware recovery process can not be performed over Wi-Fi.


The firmware recovery process will take approximately 15 minutes.



- Download the desired firmware from the Hak5 Download Portal.  While we always recommend installing the latest WiFi Pineapple Pager firmware, older versions may be installed if desired.

- Ensure the WiFi Pineapple Pager is powered off

- Hold down the ‘A’ button (green)

- Power on the WiFi Pineapple Pager by pressing the power button on the top of the unit for approximately 3 seconds, keeping the ‘A’ button held down

- The green LED on the ‘A’ button will blink slowly.  Continue holding down the ‘A’ button.

- The green LED will blink slowly 5 times, then blink rapidly.

- The WiFi Pineapple Pager screen will remain blank.  This is normal.

- Release the ‘A’ button

- Connect the WiFi Pineapple Pager to a PC or laptop using a data-capable USB-C cable

- Using a browser on your computer or laptop, navigate to the firmware recovery page at http://172.16.52.1.  Note that this URL is http not https.  It may be necessary in some browsers to explicitly specify http://172.16.52.1 as the address.

- Use the firmware recovery page to upload the firmware file you downloaded, then click the install button.




  
  
  warning
  
  
Make sure that you have selected a firmware for the WiFi Pineapple Pager.  Firmware for other devices can not be successfully installed on the WiFi Pineapple Pager and will not function.


Installing firmware for another device may render your WiFi Pineapple Pager unbootable.


  
  
While the firmware update is installing, the red and green LEDs will blink.  DO NOT power off or disconnect your WiFi Pineapple Pager during the flashing process.  The WiFi Pineapple Pager will reboot automatically once the firmware reinstall is complete.


The firmware recovery process will take approximately 15 minutes.


During the firmware recovery procedure, the WiFi Pineapple Pager screen will remain blank - this is normal.  The low level firmware recovery system does not have the resources to draw to the screen.



## Firmware recovery and storage link

The factory reset process erases both the boot flash and the expanded eMMC storage (used for /root, downloaded themes, collected loot, handshakes, etc).  The firmware recovery process only rewrites the boot flash device.


If you are planning to sell or otherwise transfer your device, or want to ensure that all data is wiped after a firmware recovery, you must then perform a factory reset.



    

    

    
                                            
                                            


	
	
		[navigate_before Factory Reset](/wifi-pineapple-pager/recovery/factory-reset/)
        
	
		[Software Updates navigate_next](/wifi-pineapple-pager/updating/software-updates/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/updating/software-updates/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Software Updates


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        Firmware updates bring bugfixes, new features, and other improvements to your device.  We recommend running the latest version!



  
  
  warning
  
  
Hak5 devices are built for security professionals:  They are designed with root access available and the freedom to install any software or firmware.  Hak5 is committed to providing reliable, unrestricted tools and open payload platforms that you can trust.


To ensure your Hak5 devices integrity, only download official firmware from the Hak5 Download Portal (verifiable via checksum).  Genuine Hak5 firmware is never distributed by third party channels, and the newest firmware for your device will always be distributed only on the Download Portal.


  
  

## Before you update link


- The WiFi Pineapple Pager will preserve your system settings and the contents of your /root/ directory during an upgrade, however it is always a good idea before you update to back up any important data, by downloading your loot via SSH or the Virtual Pager.  If you have developed any custom payloads or themes, it’s a good idea to save a copy of them as well.

- Fully charge your device.  While not strictly necessary, we strongly encourage you to fully charge the WiFi Pineapple Pager before performing a firmware upgrade.  This helps ensure there is more than enough power for the update to complete, and helps keep the device cooler.

- Do not plug in or unplug your Pager, or plug in or unplug devices from the Pager, during upgrading.




  
  
  warning
  
  
By default, the upgrade process will retain your configuration and the contents of your root directory (payloads, themes, loot, etc).


It will NOT preserve any OTHER changes made to the filesystem - third-party packages installed with opkg or installed by payloads, any manual modifications made to files not in your root directory, and other changes will be lost.


  
  

## Upgrading on-device link

The WiFi Pineapple Pager can self-upgrade.



- Make sure that the Pager is online.  Configure Wi-Fi Client Mode and connect to an access point with Internet access.

- Make sure your time and date settings are accurate.  The Pager will automatically set the time via NTP when connected to the Internet.  If the time and date are not accurate, SSL connections will fail.

- Navigate to Settings > Updates and choose ‘Check for Updates’

- Download the firmware upgrade, if one is available

- When asked to confirm installation, do so






    
        

        ![](/wifi-pineapple-pager/images/updating/check.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/updating/update.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/updating/downloading.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/updating/validating.png)


    
	




    
        

        ![](/wifi-pineapple-pager/images/updating/confirm.png)


    
	




Once the firmware upgrade process is confirmed, it can not be cancelled or aborted.  Do not power off your device, disconnect it, or connect or disconnect and USB devices from the Pager.


When the Pager has finished updating, it will reboot automatically.


The first boot after a firmware update will take significantly longer, as the internal flash is prepared and the configuration backup is restored.  Subsequent reboots will be quicker.



## Upgrading via SSH link

If you do not configure the WiFi Pineapple Pager as a client device, or can not download the firmware directly on device, upgrades may also be performed over SSH.



- Download the latest firmware from the Hak5 Download Portal.  Remember: The only source for official firmware is the Hak5 Download Portal.  The latest firmware with the latest features will ALWAYS be found on the Download Portal.  Firmware from other sources claiming to be official or to have newer features may damage your device.

- Copy the downloaded firmware to the WiFi Pineapple Pager using scp.  Check out the SSH connection section for more information on SSH and scp.  The firmware should be copied to /tmp, for example, scp pineapplepager-1.0.0-firmware-signed.bin root@172.16.52.1:/tmp/

- Log in to the Pager over SSH

- Use the INSTALL_FIRMWARE command to validate and install the firmware you copied.  INSTALL_FIRMWARE /tmp/pineapplepager-xzy-firmware-signed.bin




  
  
  warning
  
  
Do not try to upgrade the firmware via the Virtual Pager shell!


While it’s not likely to cause any damage to your device, one of the first things the upgrade process does is stop all running services - like the service running the virtual pager.  This can terminate your shell before the upgrade actually starts, leaving you in limbo!


  
  
The INSTALL_FIRMWARE command will automatically validate the firmware image and begin installation.  Once you have run this command, upgrading the firmware can not be cancelled or aborted. Do not power off your device, disconnect it, or connect or disconnect and USB devices from the Pager.


When the Pager has finished updating, it will reboot automatically.


The first boot after a firmware update will take significantly longer, as the internal flash is prepared and the configuration backup is restored.  Subsequent reboots will be quicker.



    

    

    
                                            
                                            


	
	
		[navigate_before Firmware Recovery](/wifi-pineapple-pager/recovery/firmware-recovery/)
        
	
		[Glossary navigate_next](/wifi-pineapple-pager/tutorial/glossary/)


---

<!-- Source: https://docs.hak5.org/wifi-pineapple-pager/tutorial/glossary/ -->

[](/wifi-pineapple-pager/)
            
                menu
            
            
            
                    
                    
                        search
                        Search
                        
                            
                                
                                    
                                
                                
                                    
                                
                            
                        
                    
                
            

        
            
                
            

            
                
                    
                        Enable dark mode
                        
                    
                
                
                    
                        Enable light mode
                        
                    
                
            
            
        
    
    
    
            
                
                    
                        - to navigate

                        - to select

                        - to close

                    
                    
                        
                            
                            
                                cancel
                            
                        
                        
                    
                
            
        
    
    



                            
                                
                                    
                                        
                                    
                                    
                                        
                                        
    On this page
    
    
                                        
                                        
                                        
                                            
                                                Table of Contents
                                            

                                        
                                            
                                                
                                                *article*
                                                
                                                
# Glossary


                                            
                                            
                                                


                                            
                                            
                                                
    
    
        | Term | Definition |
|---|---|
| Access Point | A wireless device which provides Wi-Fi signal to client devices. |
| BSSID | “Basic Service Set Identifier”, the MAC address of an access point |
| EAPOL | “Extended Authentication Packet Over LAN”; When mentioned here, an EAPOL packet is part of a WPA handshake. |
| GNSS | “Global Navigation Satellite System”; the technically accurate term for any of several global positioning systems, including GPS, GLONASS, BeiDou, and Galileo |
| GPS | “Global Positioning System”, often used as an encompassing term for any satellite-based positioning, but technically only the system owned and operated by the United States.  See also GNSS* |
| MAC Address | A unique (typically 6 byte) address assigned to a network interface.  MAC addresses identify an Ethernet, Wi-Fi, Bluetooth, and other types of devices. |
| Monitor mode | A firmware mode for a Wi-Fi adapter which allows capture of raw 802.11 packets, without being associated to a network.  Monitor mode is supported by most, but not all, Wi-Fi adapters under Linux, but frequently is not available on other operating systems.  Monitor mode is a crucial part of the Pineapple Recon system. |
| PMKID | The hashed result of a WPA network PSK and SSID; When mentioned here, a PMKID packet is part of a WPA handshake generated by the EvilWPA access point.  Typically less reliable than a full WPA handshake for discovering the original PSK, but still a viable attack. |
| PSK | “Pre-Shared Key”; The secret key used on a WPA network, or the WPA network password. |
| SSID | Service Set Identifier, or more correctly, the ESSID (Extended Service Set Identifier).  The SSID is the name advertised for a Wi-Fi network. |
| WPA | A generic term for “Wi-Fi Protected Access”, the current-generation suite of encryption and authentication standards for Wi-Fi.  Sometimes also used to refer to WPA1, the informal name for the first revision of the WPA standards.  WPA1 is considered weakened and dangerous to use on new networks at this point. |
| WPA2 | A generic term for the second generation of WPA standards.  WPA2 mandates a stronger encryption suite than WPA1 and includes additional protections.  WPA2 is the most commonly deployed network type. |
| WPA3 | A generic term for the third generation of WPA standards.  The WPA3 suite attemts to address vulnerabilities in the WPA1 and WPA2 standards which allow for access point impersonation, client disconnection, and offline attacks against captured handshakes.  The WPA3 suite also introduces encrypted networks without a pre-shared password.  Currently very few networks use WPA3 protection, but it is mandated for newer Wi-Fi standards such as Wi-Fi 6e on 6GHz. |
| WPA3-OWE | “Opportunistic Wireless Encryption”; the new standard for WPA3 networks operating in ‘open’ mode.  An OWE-enabled network does not require a password to join, but does a key exchange when the client connects which encrypts the data on a per-user basis.  OWE does not prevent impersonation, but does protect data packets from being captured via monitoring. |



    

    

    
                                            
                                            


	
	
		[navigate_before Software Updates](/wifi-pineapple-pager/updating/software-updates/)
