// Scripted by Player (Graal5269193)

function onActionServerSide() {
  switch (params[0]) {
  case "setnickname":

    temp.newnick = params[1];
    temp.newnick = temp.newnick.length() > 50 ? temp.newnick.substring(0, 50) : temp.newnick;
    temp.i = temp.newnick.pos("(");
    if (temp.i >= 0) temp.newnick = temp.newnick.substring(0, temp.i).trim();
    if (temp.newnick == "") return;
    if (temp.newnick.lower().pos("admin") != -1) return;
    if (temp.newnick.lower().pos("adm1n") != -1) return;
    if (temp.newnick.lower().pos("Ádmin") != -1) return;
    if (temp.newnick.pos("Àdmin") != -1) return;
    if (temp.newnick.lower().pos("Ádm1n") != -1) return;

    DB_Profile.setProfileData(player.account, "setnickname", temp.newnick);
    break;
  case "setrelationship":
    temp.relationship = (params[1] in {"Married", "Single", "Partner"}) ? params[1] : "Single";
    DB_Profile.setProfileData(player.account, "setrelationshipstatus", params[1]);
    break;
  case "setCustomizationAttribute":
    temp.category = params[1][0];
    temp.image = params[1][1];
    if (!(temp.image in serverr.customization.(@temp.category) || temp.image in player.clientr.customization.(@temp.category))) {
      switch (temp.category.lower()) {
        case "heads":
        player.head = "head0.png";
        break;
        case "bodies":
        player.body = "body.png";
        break;
        case "hats":
        player.attr[1] = "no-hat.png";
        break;
      }
      player.chat = "hack detected?";
    }
    break;
  }
}


//#CLIENTSIDE

function onPlayerEnters() {
  updateZoom();
  updateSounds();
}

function onCreated() {
  const customs_perpage = 15;
  addDefaultGUIProfiles();
  //player.clientr.customization.bodies = {"tb_olwest_personal_body_graal3336048-135.png"};
}

public function showEditProfile() {
  showEditProfileWindow();
}

function showEditProfileWindow() {
  if (isObject("Games_EditProfile_Window")) Games_EditProfile_Window.destroy();
  this.createGUIWindow("Games_EditProfile_Window", 2, 0);
  this.addTitleControl(Games_EditProfile_Window, "Games_EditProfile_Title", "Edit");
  this.addBackButton(Games_EditProfile_Window_Panel0, "Games_EditProfile_BackButton");
  addTabs(); // Creates tabs
  Games_EditProfile_Window.showtop();
}

function addTabs() {
  if (!(isObject("Games_EditProfile_Window_PanelContent0"))) return;
  with(Games_EditProfile_Window_PanelContent0) {
    new GuiControl("Games_EditProfile_TabUI") {
      profile = Games_TableWindow_BackProfile;
      useownprofile = true;
      profile.modal = false;
      temp.tabs = {"Information", "Options", "Looks"};
      temp.tabpanels = {0, 1, 2};
      temp.tabwidth = ({200, 200, 200, 143, 105})[temp.tabpanels.size()];
      temp.totaltabwidth = temp.tabwidth * temp.tabpanels.size() + 39;
      resize((Games_EditProfile_Window_PanelContent0.clientwidth - temp.totaltabwidth) / 2, 45, temp.totaltabwidth, 31);
      x = 10;
      y = 20;

      for (temp.i = temp.tabpanels.size() - 1; temp.i >= 0; temp.i--) {
        temp.tabindex = temp.tabpanels[temp.i];

        new GuiBitmapButtonCtrl("Games_EditProfile_Tab" @ temp.tabindex) {
          useownprofile = true;
          profile.modal = true;
          resize(temp.i * temp.tabwidth, 0, temp.tabwidth + 39, 31);
          normalbitmap = pressedbitmap = mouseoverbitmap = "guigames_arctab.png";
          this.tabindex = temp.tabindex;
          this.guiname = this.name;
          thiso.catchevent(this, "onAction", "onProfileTabClick");
          visible = true;

          new GuiTextCtrl("Games_EditProfile_Tab" @ temp.tabindex @ "Text") {
            useownprofile = true;
            profile.modal = false;
            profile.fontcolor = "black";
            profile.fontstyle = "b";
            profile.align = "center";
            profile.fontsize = 17;
            resize(0, 8, temp.tabwidth + 39, 22);
            text = temp.tabs[temp.tabindex];
          }
        }
      }
    }
  }

  addInformationPage(); // Start page will be information page
}


function addInformationPage() {
  if (!isObject("Games_EditProfile_Window_PanelContent0")) return;

  removePage();

  with(Games_EditProfile_Window_PanelContent0) {

   new GuiControl("Game_EditProfile_MainInterface") {
   useownprofile = true;
   profile.opaque = true;
   profile.fillcolor = "0 0 0 60";
   profile.border = 1;
   x = 20;
   y = 52;
   width = Games_EditProfile_Window_PanelContent1.width - 35;
   height = Games_EditProfile_Window_PanelContent1.height - 90;

    new GuiScrollCtrl("Games_EditProfile_MenuScroll") {
      //profile = GuiBlueScrollProfile;
      useownprofile = true;
      //profile.bitmap = "spawn_gui-scroll_trans.png";
      profile.border = 0;
      x = 0;
      y = 0;
      width = Games_EditProfile_Window_PanelContent1.width - 35;
      height = Games_EditProfile_Window_PanelContent1.height - 90;
      hScrollBar = "alwaysOff";
      vScrollBar = "alwaysOff";
      this.join("gui_touchscroll_old");

      new GuiMLTextCtrl("Games_EditProfile_InformationPage_Text") {
        profile = GuiBlueTextProfile;
        useownprofile = true;
        active = false;
        profile.fonttype = "Corleone";
        profile.fontsize = 18;
        profile.fontcolor = "white";
        profile.textshadow = true;
        profile.shadowoffset = {1,1};
        wordwrap = false;
        x = 5;
        y = 10;
        height = 24;
        width = 82;
        text = "The data is stored on the server. Tap Erase Data to delete.";
      }

      new GuiMLTextCtrl("Games_EditProfile_Nickname_Text") {
        profile = GuiBlueTextProfile;
        useownprofile = true;
        active = false;
        profile.fonttype = "Corleone";
        profile.fontsize = 24;
        profile.fontcolor = "white";
        profile.textshadow = true;
        profile.shadowoffset = {1,1};
        x = 40;
        y = 50;
        height = 24;
        width = 82;
        text = "Nickname:";
      }

      new GuiTextEditCtrl("Games_EditProfile_Nickname_EditText") {
        profile = GuiBlueTextEditProfile;
        useownprofile = true;
        profile.border = 0;
        profile.fillcolor = "255 255 255";
        profile.cursorcolor = "0 0 0";
        profile.fontcolor = "black";
        profile.fillcolorhl = "brown";
        width = 175;
        height = 25;
        x = Games_EditProfile_Nickname_Text.x + Games_EditProfile_Nickname_Text.width;
        y = Games_EditProfile_Nickname_Text.y + 2;
        text = player.nick;
        thiso.catchEvent(this, "onAction", "onSetNewName");
      }

      new GuiButtonCtrl("Games_EditProfile_EraseData_Button") {
        profile = GuiBlueButtonProfile;
        useownprofile = true;
        profile.bitmap = "spawn_wverty_button.png";
        profile.fontcolor = "white";
        profile.fontstyle = "b";
        width = 120;
        height = 28;
        //x = Games_EditProfile_Nickname_EditText.x + 170;
        x = Games_EditProfile_MenuScroll.width - width - 10;
        y = Games_EditProfile_Nickname_EditText.y - 40;
        text = "Erase Data";
        thiso.catchEvent(this, "onAction", "onEraseData");
      }

      new GuiButtonCtrl("Games_EditProfile_Gangs_Button") {
        profile = GuiBlueButtonProfile;
        useownprofile = true;
        profile.bitmap = "spawn_wverty_button.png";
        profile.fontcolor = "white";
        profile.fontstyle = "b";
        width = 120;
        height = 32;
        mouseoverbitmap = pressedbitmap = normalbitmap = "guigames_arcbutton.png";
        x = Games_EditProfile_MenuScroll.width - width - 10;
        y = Games_EditProfile_Nickname_EditText.y - 3;
        text = (player.guild) ? player.guild : "Gangs";
      }

      new GuiMLTextCtrl("Games_EditProfile_Gender_Text") {
        profile = GuiBlueTextProfile;
        useownprofile = true;
        active = false;
        profile.fonttype = "Corleone";
        profile.fontsize = 24;
        profile.fontcolor = "white";
        profile.textshadow = true;
        profile.shadowoffset = {1,1};
        height = 24;
        width = 100;
        x = Games_EditProfile_Nickname_Text.x;
        y = Games_EditProfile_Nickname_Text.y + height + 30;
        text = "Gender:";
      }

      new GuiBitmapButtonCtrl("Games_EditProfile_Gender_SwitchButton") {
        width = height = 32;
        useownprofile = true;
        x = Games_EditProfile_Gender_Text.x + width + 70;
        y = Games_EditProfile_Gender_Text.y;
        normalbitmap = mouseoverbitmap = pressedbitmap = "spawn_icon-" @ player.client.gender @ ".png";
        thiso.catchEvent(this, "onAction", "onOpenGender");
      }

      new GuiMLTextCtrl("Games_EditProfile_Relationship_Text") {
        profile = GuiBlueTextProfile;
        useownprofile = true;
        active = false;
        profile.fonttype = "Corleone";
        profile.fontsize = 24;
        profile.fontcolor = "white";
        profile.textshadow = true;
        profile.shadowoffset = {1,1};
        height = 24;
        width = 100;
        x = Games_EditProfile_Gender_Text.x;
        y = Games_EditProfile_Gender_Text.y + height + 30;
        text = "Relationship:";
      }

      new GuiBitmapButtonCtrl("Games_EditProfile_Relationship_SwitchButton") {
        useownprofile = true;
        profile.fonttype = "Corleone";
        profile.fontsize = 20;
        profile.fontcolor = "white";
        width = 64;
        height = 32;
        x = Games_EditProfile_Relationship_Text.x + width + 40;
        y = Games_EditProfile_Relationship_Text.y;
        normalbitmap = mouseoverbitmap = pressedbitmap = "spawn_gui-transparent.png";
        text = player.clientr.relationship_status;
        thiso.catchEvent(this, "onAction", "onOpenRelationship");
      }

      new GuiMLTextCtrl("Games_EditProfile_Country_Text") {
        profile = GuiBlueTextProfile;
        useownprofile = true;
        active = false;
        profile.fonttype = "Corleone";
        profile.fontsize = 24;
        profile.fontcolor = "white";
        profile.textshadow = true;
        profile.shadowoffset = {1,1};
        height = 24;
        width = 82;
        x = Games_EditProfile_Gender_SwitchButton.x + width + 30;
        y = Games_EditProfile_Gender_SwitchButton.y;
        text = "Country:";
      }

      new GuiBitmapButtonCtrl("Games_EditProfile_Country_SwitchButton") {
        useownprofile = true;
        width = height = 32;
        x = Games_EditProfile_Country_Text.x + width + 70;
        y = Games_EditProfile_Country_Text.y;
        fileupdate("guigames_flag_" @ player.client.country @ ".png");
        normalbitmap = mouseoverbitmap = pressedbitmap = "guigames_flag_" @ player.client.country @ ".png";
        thiso.catchEvent(this, "onAction", "onOpenCountryChange");
        }

      }
    }
  }
}



function addCountryPage() {
  if (!isObject("Games_EditProfile_MenuScroll")) return;

  removePage();

  temp.country_row = 0;
  temp.country_col = 0;

  createExitButton("addInformationPage");

  with(Games_EditProfile_MenuScroll) {

    for (temp.i = 0; temp.i < serverr.countryCodes.size(); temp.i++) {
      if (temp.country_row == 5) {
        temp.country_row = 0;
        temp.country_col++;
      }

      new GuiBitmapButtonCtrl("Games_Profile_Country_" @ serverr.countryCodes[temp.i][1] @ "_Button") {
        useownprofile = true;
        profile.modal = true;
        x = 55 + temp.country_row * 72;
        y = 20 + temp.country_col * 72;
        width = height = 32;
        this.country = serverr.countryCodes[temp.i][1];
        normalbitmap = mouseoverbitmap = pressedbitmap = "guigames_flag_" @ serverr.countryCodes[temp.i][1] @ ".png";
        thiso.catchEvent(this, "onAction", "onSwitchCountry");
      }

      new GuiMLTextCtrl("Games_Profile_Country_" @ serverr.countryCodes[temp.i][1] @ "_Text") {
        profile = GuiBlueMLTextProfile;
        useownprofile = true;
        profile.fonttype = "Corleone";
        profile.fontsize = 12;
        profile.fontcolor = "white";
        profile.modal = false;
        width = gettextwidth(1, "Corleone", "", serverr.countryCodes[temp.i][0]);
        height = 60;
        x = ("Games_Profile_Country_" @ serverr.countryCodes[temp.i][1] @ "_Button").x + (("Games_Profile_Country_" @ serverr.countryCodes[temp.i][1] @ "_Button").width / 2) - ((width/2) / 2);
        y = ("Games_Profile_Country_" @ serverr.countryCodes[temp.i][1] @ "_Button").y + ("Games_Profile_Country_" @ serverr.countryCodes[temp.i][1] @ "_Button").height + 10;
        text = serverr.countryCodes[temp.i][0];
      }

      temp.country_row++;
    }
  }
}


function addRelationshipMenu() {
  if (!isObject("Games_EditProfile_MenuScroll")) return;

  removePage();

  createExitButton("addInformationPage");

  with(Games_EditProfile_MenuScroll) {
    new GuiMLTextCtrl("Games_EditProfile_Relationship_InformationText") {
      profile = GuiBlueMLTextProfile;
      useownprofile = true;
      profile.fonttype = "Corleone";
      profile.fontcolor = "white";
      x = 135;
      y = 15;
      width = 200;
      height = 60;
      text = "<font size=24>Select relationship status:";
    }

    new GuiBitmapButtonCtrl("Games_EditProfile_Relationship_Single_Icon") {
      x = 70;
      y = Games_EditProfile_Relationship_InformationText.y + 60;
      width = height = 64;
      normalbitmap = mouseoverbitmap = pressedbitmap = "block.png";
      this.relationship = "Single";
      thiso.catchEvent(this, "onAction", "onSwitchRelationship");
    }

    new GuiTextCtrl("Games_Profile_Relationship_Single_Text") {
      profile = GuiBlueTextProfile;
      useownprofile = true;
      profile.fonttype = "Corleone";
      profile.fontcolor = "white";
      profile.fontsize = 20;
      height = 20;
      x = Games_EditProfile_Relationship_Single_Icon.x + 10;
      y = Games_EditProfile_Relationship_Single_Icon.y + 80;
      text = "Single";
    }

    new GuiBitmapButtonCtrl("Games_EditProfile_Relationship_Married_Icon") {
      x = Games_EditProfile_Relationship_Single_Icon.x + 120;
      y = Games_EditProfile_Relationship_Single_Icon.y;
      width = height = 64;
      normalbitmap = mouseoverbitmap = pressedbitmap = "block.png";
      this.relationship = "Married";
      thiso.catchEvent(this, "onAction", "onSwitchRelationship");
    }

    new GuiTextCtrl("Games_Profile_Relationship_Married_Text") {
      profile = GuiBlueTextProfile;
      useownprofile = true;
      profile.fonttype = "Corleone";
      profile.fontcolor = "white";
      profile.fontsize = 20;
      height = 20;
      x = Games_EditProfile_Relationship_Married_Icon.x + 10;
      y = Games_EditProfile_Relationship_Married_Icon.y + 80;
      text = "Married";
    }
    new GuiBitmapButtonCtrl("Games_EditProfile_Relationship_Partner_Icon") {
      x = Games_EditProfile_Relationship_Married_Icon.x + 120;
      y = Games_EditProfile_Relationship_Married_Icon.y;
      width = height = 64;
      normalbitmap = mouseoverbitmap = pressedbitmap = "block.png";
      this.relationship = "Partner";
      thiso.catchEvent(this, "onAction", "onSwitchRelationship");
    }

    new GuiTextCtrl("Games_Profile_Relationship_Partner_Text") {
      profile = GuiBlueTextProfile;
      useownprofile = true;
      profile.fonttype = "Corleone";
      profile.fontcolor = "white";
      profile.fontsize = 20;
      height = 20;
      x = Games_EditProfile_Relationship_Partner_Icon.x + 10;
      y = Games_EditProfile_Relationship_Partner_Icon.y + 80;
      text = "Partner";
    }
  }
}

function addGenderMenu() {
  if (!isObject("Games_EditProfile_MenuScroll")) return;

  removePage();

  createExitButton("addInformationPage");

  with(Games_EditProfile_MenuScroll) {
    new GuiMLTextCtrl("Games_EditProfile_Gender_InformationText") {
      profile = GuiBlueMLTextProfile;
      useownprofile = true;
      profile.fonttype = "Corleone";
      profile.fontcolor = "white";
      x = 165;
      y = 20;
      width = 160;
      height = 60;
      text = "<font size=24>Select a gender:";
    }

    new GuiBitmapButtonCtrl("Games_EditProfile_Gender_MaleButton") {
      x = 130;
      y = Games_EditProfile_Gender_InformationText.y + 60;
      width = height = 64;
      normalbitmap = mouseoverbitmap = pressedbitmap = "spawn_icon-male.png";
      this.gender = "male";
      thiso.catchEvent(this, "onAction", "onSwitchGender");
    }

    new GuiTextCtrl("Games_EditProfile_Gender_MaleText") {
      profile = GuiBlueTextProfile;
      useownprofile = true;
      profile.fonttype = "Corleone";
      profile.fontcolor = "white";
      profile.fontsize = 20;
      height = 20;
      x = Games_EditProfile_Gender_MaleButton.x + 10;
      y = Games_EditProfile_Gender_MaleButton.y + 80;
      text = "Male";
    }

    new GuiBitmapButtonCtrl("Games_EditProfile_Gender_FemaleButton") {
      x = Games_EditProfile_Gender_MaleButton.x + 120;
      y = Games_EditProfile_Gender_MaleButton.y;
      width = height = 64;
      normalbitmap = mouseoverbitmap = pressedbitmap = "spawn_icon-female.png";
      this.gender = "female";
      thiso.catchEvent(this, "onAction", "onSwitchGender");
    }

    new GuiTextCtrl("Games_EditProfile_Gender_FemaleText") {
      profile = GuiBlueTextProfile;
      useownprofile = true;
      profile.fonttype = "Corleone";
      profile.fontcolor = "white";
      profile.fontsize = 20;
      height = 20;
      x = Games_EditProfile_Gender_FemaleButton.x + 10;
      y = Games_EditProfile_Gender_FemaleButton.y + 80;
      text = "Female";
    }
  }
}

function addOptionsPage() {
  if (!(isObject("Games_EditProfile_MenuScroll"))) return;
  removePage();
  temp.column = 0;
  temp.row = 0;
  temp.settings = {
    {"General", "spawn_general-icon.png", "general"},
    {"Sounds", "spawn_sound-icon.png", "sounds"},
    {"Controls", "spawn_general-icon.png", "controls"},
    {"Profile", "spawn_profile-icon.png", "profile"}
  };
  with(Games_EditProfile_MenuScroll) {
    for (temp.i = 0; temp.i < temp.settings.size(); temp.i++) {
      if (temp.row == 2) {
        temp.row = 0;
        temp.column++;
      }
      new GuiBitmapButtonCtrl("Games_EditProfile_Section_" @ temp.i) {
        x = 5 + 215 * temp.row;
        y = 10 + 55 * temp.column;
        width = height = 42;
        normalbitmap = mouseoverbitmap = pressedbitmap = "new_hotkey-2.png";
        this.setting = temp.settings[temp.i];
        thiso.catchEvent(this, "onAction", "OnOpenSettingPage");
        new GuiBitmapCtrl("Games_EditProfile_Section_" @ temp.i @ "_Image") {
        useownprofile = true;
        x = 5;
        y = 5;
        width = 32;
        height = 32;
        bitmap = temp.settings[temp.i][1];
        profile.modal = false;
        //active = false;
       }
      }
      new GuiTextCtrl("Games_EditProfile_Section_" @ temp.i @ "_Label") {
        profile = GuiBlueTextProfile;
        useownprofile = true;
        profile.fonttype = "Corleone";
        profile.fontsize = 20;
        profile.fontcolor = "white";
        profile.textshadow = true;
        profile.shadowoffset = {1,1};
        x = ("Games_EditProfile_Section_" @ temp.i).x + ("Games_EditProfile_Section_" @ temp.i).width + 10;
        y = ("Games_EditProfile_Section_" @ temp.i).y + 8;
        height = 20;
        text = temp.settings[temp.i][0];
      }
      temp.row++;
    }
  }
}

function addOptionSettings(temp.category) {
  /*
  Title,              // [0] The name or title of the setting displayed in the UI.
  Description,        // [1] A short description or tooltip for the setting.
  Action Handler,     // [2] The function name called when the setting changes.
  Variable name,      // [3] The variable where the settingâ€™s value is stored.
  Control Type,       // [4] Type of control used (e.g., "checkbox", "slidebar").
  Additional Properties,  // [5] (Optional) Extra settings for certain controls (e.g., range for sliders).
  Platform Restriction    // [6] (Optional) Specific platform for this setting ("mobile", "pc", or leave null for all).

  */

  if (!isObject("Games_EditProfile_MenuScroll")) return;
  removePage();

  temp.marginx = 30;
  temp.buttonExtraSpace = 15; // Extra space after the button

  temp.settings.general = {
    {"Smooth Zoom", "Allows you to customize zoom in/out.", "onSmoothZoom", "player.client.zoomfactor", "slidebar", {1, 10, 1}},
    {"Combo Box Test", "A test to make combo box", "onTeste", "varhere", "combobox", {160,20, {"Teste","Wow","Haha"}}},
    {"Redeem Promo Code", "Allows you to redeem in-game promo codes", "onRedeem", "varhere", "texteditbox", "submitbutton"},
    {"Free Resources", "Frees all of game resources (can improve performance)", "onFreeResources", "", "button", {120,30}}
  };

  temp.settings.profile = {
    {"Private Online Time", "Hides your onlinetime for other players.", "onSelectBasicSetting", "player.client.private_onlinetime", "checkbox"},
    {"Private Gralats", "Hides your gralats for other players.", "onSelectBasicSetting", "player.client.private_gralats", "checkbox"},
    {"Private Relationship", "Hides your relationship for other players.", "onSelectBasicSetting", "player.client.private_relationship", "checkbox"},
    {"Private Kills", "Hides your kills for other players.", "onSelectBasicSetting", "player.client.private_kills", "checkbox"},
    {"Private Spar Stats", "Hides your spar stats for other players.", "onSelectBasicSetting", "player.client.private_sparstats", "checkbox"}
  };

  temp.settings.controls = {
    {"Controls Size", "Adjust the size of the main HUB", "onUpdateController", "player.client.profile_controllersize", "slidebar", {0, 50, 1}},
    {"Controls Margin Horizontal", "Add a horizontal margin to the controls", "onUpdateController", "player.client.profile_controllermargin_horizontal", "slidebar", {0, 50, 1}},
    {"Controls Margin Vertical", "Add a vertical margin to the controls", "onUpdateController", "player.client.profile_controllermargin_vertical", "slidebar", {0, 50, 1}}
  };

  temp.settings.sounds = {
    {"Music", "The volume of Music in the game (i.e. entering a shop)", "onSetMusicVolume", "player.client.musicvolume", "slidebar", {0, 100, 10}},
    {"Sounds", "The volume of Sounds in the game (i.e. guns and melees)", "onSetMusicVolume", "player.client.soundvolume", "slidebar", {0, 100, 10}}
  };

  temp.Settings = temp.settings.(@temp.category);

  if (temp.Settings == null) return addOptionsPage();

  with(Games_EditProfile_MenuScroll.createanimation()) {
    duration = 0.3;
    transition = "fadein";
  }

  with(Games_EditProfile_MenuScroll) {
  new GuiTextCtrl("Games_EditProfile_Settings_CategoryText") {
      profile = GuiBlueTextProfile;
      useownprofile = true;
      active = false;
      profile.fonttype = "Corleone";
      profile.fontcolor = "white";
      profile.fontsize = 24;
      profile.textshadow = true;
      profile.shadowoffset = {1,1};
      width = gettextwidth(1, "Corleone", "", makeFirstCharUpper(temp.category) SPC "Options");
      height = 20;
      //x = Games_EditProfile_MenuScroll.width / 2 - (width * 8);
      x = Games_EditProfile_MenuScroll.width / 2 - (width/2) - 10;
      y = 5;
      text = makeFirstCharUpper(temp.category) SPC "Options";
    }

    createExitButton("onOpenOptionsPage");

    temp.lastControlY = 50;

    for (temp.i = 0; temp.i < Settings.size(); temp.i++) {
      // Platform-specific filter
      temp.settingPlatform = Settings[temp.i][6];
      if (temp.settingPlatform != null) {
        if ((temp.settingPlatform.lower() == "pc" && player.platform in {"android", "iphone"}) || (temp.settingPlatform.lower() == "mobile" && player.platform == "win")) {
          continue; // Skip element creation if the platform doesn't match
        }
      }

      // Element creation based on type
      temp.controlHeight = 78; // Base control height

      // Title text
      new GuiMLTextCtrl("Games_EditProfile_Settings_Text_" @ temp.i) {
        profile = GuiBlueTextProfile;
        useownprofile = true;
        active = false;
        profile.fonttype = "Corleone";
        profile.fontcolor = "white";
        profile.fontsize = 24;
        profile.textshadow = true;
        profile.shadowoffset = {1,1};
        width = Games_EditProfile_MenuScroll.width - 70;
        height = 20;
        x = temp.marginx;
        y = temp.lastControlY + 5;
        text = Settings[temp.i][0];
      }

      // Checkbox control
      if (Settings[temp.i][4].lower() == "checkbox") {
        new GuiCheckBoxCtrl("Games_EditProfile_Settings_Checkbox_" @ temp.i) {
          profile = Games_CheckBoxProfile;
          useownprofile = true;
          profile.fontcolor = "white";
          x = temp.marginx;
          y = temp.lastControlY + 50;
          this.settings = Settings[temp.i];
          width = 20;
          height = 20;
          temp.checkedvar = makevar(Settings[temp.i][3]);
          checked = temp.checkedvar;
          thiso.catchEvent(this, "onAction", Settings[temp.i][2]);
        }
      }

      // Description control
      new GuiTextCtrl("Games_EditProfile_Settings_Description_" @ temp.i) {
        profile = GuiBlueTextProfile;
        useownprofile = true;
        profile.fontcolor = "white";
        active = false;
        wordwrap = false;
        profile.textshadow = true;
        profile.shadowoffset = {1,1};
        x = temp.marginx;
        y = temp.lastControlY + 30;
        //width = Games_EditProfile_MenuScroll.width - 70;
        width = gettextwidth(1, "", "", Settings[temp.i][1]);
        height = 20;
        text = Settings[temp.i][1];
        this.settings = Settings[temp.i];
        if (!(Settings[temp.i][4].lower() in {"slidebar", "button", "checkbox","combobox","texteditbox"})) {
          this.destroy();
        }
      };

   // Textedit box control
  if (Settings[temp.i][4].lower() == "texteditbox") {
    new GuiTextEditCtrl("Games_EditProfile_Settings_TextEdit_" @ temp.i) {
      profile = GuiBlueTextEditProfile;
      useownprofile = true;
      profile.border = 0;
      profile.fillcolor = "255 255 255";
      profile.cursorcolor = "0 0 0";
      profile.fontcolor = "black";
      profile.fillcolorhl = "brown";
      x = temp.marginx;
      y = temp.lastControlY + 52;
      width = 160;
      height = 20;
      text = "";
      //thiso.catchEvent(this, "onAction", Settings[temp.i][2]);
      temp.action = (Settings[temp.i][5] != "submitbutton") ? thiso.catchEvent(this, "onAction", Settings[temp.i][2]) : null;
    }
  }

  if (Settings[temp.i][4].lower() == "texteditbox") {
  new GuiButtonCtrl("Games_EditProfile_Settings_TextEditButton_" @ temp.i) {
          profile = GuiBlueButtonProfile;
          useownprofile = true;
          profile.bitmap = "spawn_wverty_button.png";
          profile.fontcolor = "white";
          width = 100;
          height = 25;
          x = ("Games_EditProfile_Settings_TextEdit_" @ temp.i).x + ("Games_EditProfile_Settings_TextEdit_" @ temp.i).width + 10;
          y = ("Games_EditProfile_Settings_TextEdit_" @ temp.i).y - 2;
          text = "Submit";
          this.index = temp.i;
          this.settings = Settings[temp.i];
          temp.action = (Settings[temp.i][5] == "submitbutton") ? thiso.catchEvent(this, "onAction", Settings[temp.i][2]) : null;
          if (Settings[temp.i][5] != "submitbutton") {
            this.destroy();
          }
        }
      }

  if (Settings[temp.i][4].lower() == "combobox") {
    new GuiPopUpMenuCtrl("Games_EditProfile_Settings_Combobox_" @ temp.i) {
      profile = GuiBluePopUpMenuProfile;
      textprofile = GuiBlueTextListProfile;
      scrollprofile = GuiBlueScrollProfile;
      useownprofile = true;
      useownscrollprofile = true;
      profile.fontsize = 16;
      profile.fontcolor = "white";
      profile.fonttype = "elementaryheavysf";
      profile.bitmap = "spawn_gui-scroll.png";

      textprofile.fontcolor = "white";
      textprofile.cursorcolor = "white";
      x = temp.marginx;
      y = temp.lastControlY + 52;
      width = (Settings[temp.i][5][0]) ? Settings[temp.i][5][0] : 160;
      height = (Settings[temp.i][5][1]) ? Settings[temp.i][5][1] : 20;
      this.settings = Settings[temp.i];
      thiso.catchEvent(this, "onSelect", Settings[temp.i][2]);
      text = "Test";
      clearrows();
      for (temp.c = 0; temp.c < Settings[temp.i][5][2].size(); temp.c++) {
        addrow(temp.c, Settings[temp.i][5][2][temp.c]);
      }
    }
  }

      // Slider control
      if (Settings[temp.i][4].lower() == "slidebar") {
        new GuiSliderCtrl("Games_EditProfile_Settings_Slidebar_" @ temp.i) {
          profile = GuiBlueSliderProfile;
          x = temp.marginx;
          y = temp.lastControlY + 50;
          width = 250;
          height = 20;
          range = (Settings[temp.i][5] != null) ? {Settings[temp.i][5][0], Settings[temp.i][5][1]} : {0, 100};
          value = makevar(Settings[temp.i][3]);
          ticks = (Settings[temp.i][5]) ? Settings[temp.i][5][2] : 10;
          this.slidebar = temp.i;
          this.settings = Settings[temp.i];
          thiso.catchEvent(this, "onReleaseSlider", Settings[temp.i][2]);
          thiso.catchEvent(this, "onAction", "updateSlideBarText");
        }
      }

     // Slider progressbar control txt
     if (Settings[temp.i][4].lower() == "slidebar") {
     new GuiTextCtrl("Games_EditProfile_Settings_Slidebar_" @ temp.i @ "_ProgressText") {
        profile = GuiBlueTextProfile;
        useownprofile = true;
        profile.fonttype = "Corleone";
        profile.fontcolor = "white";
        profile.modal = false;
        active = false;
        wordwrap = false;
        profile.fontsize = 16;
        x = ("Games_EditProfile_Settings_Slidebar_" @ temp.i @ "").x + ("Games_EditProfile_Settings_Slidebar_" @ temp.i @ "").width + 20;
        y = ("Games_EditProfile_Settings_Slidebar_" @ temp.i @ "").y;
        temp.txt = int(("Games_EditProfile_Settings_Slidebar_" @ temp.i).value / Settings[temp.i][5][1] * 100) SPC "%";
        width = gettextwidth(1, "Corleone", "", temp.txt);
        height = 20;
        text = temp.txt;
        if (!(Settings[temp.i][4].lower() in {"slidebar"})) {
          this.destroy();
        }
      }
    }
      // Button control
      if (Settings[temp.i][4].lower() == "button") {
        new GuiButtonCtrl("Games_EditProfile_Settings_Button_" @ temp.i) {
          profile = GuiBlueButtonProfile;
          useownprofile = true;
          profile.bitmap = "spawn_wverty_button.png";
          profile.fontcolor = "white";
          width = (Settings[temp.i][5][0]) ? Settings[temp.i][5][0] : 120;
          height = (Settings[temp.i][5][1]) ? Settings[temp.i][5][1] : 30;
          x = temp.marginx;
          y = temp.lastControlY + 55;
          text = Settings[temp.i][0];
          thiso.catchEvent(this, "onAction", Settings[temp.i][2]);
        }
        temp.lastControlY += temp.buttonExtraSpace; // Extra space for button
      }

      // Update lastControlY based on each created control's height
      temp.lastControlY += temp.controlHeight;
    }
  }
}




function addLookPage() {
  if (!isObject("Games_EditProfile_MenuScroll")) return;

  removePage();

  with(Games_EditProfile_MenuScroll) {
    new GuiShowImgCtrl("Games_EditProfile_Look_Actor1") {
      x = 95;
      y = 110;
      width = 60;
      height = 60;
      ani = "idle";
      actor.dir = 1;
      actor.head = player.head;
      actor.body = player.body;
      actor.attr[1] = player.attr[1];
      for (temp.i = 0; temp.i < 5; temp.i++) {
        actor.colors[temp.i] = player.colors[temp.i];
      }
    }
    new GuiShowImgCtrl("Games_EditProfile_Look_Actor2") {
      x = Games_EditProfile_Look_Actor1.x + 100;
      y = Games_EditProfile_Look_Actor1.y;
      width = 60;
      height = 60;
      ani = "idle";
      actor.dir = 2;
      actor.head = player.head;
      actor.body = player.body;
      actor.attr[1] = player.attr[1];
      for (temp.i = 0; temp.i < 5; temp.i++) {
        actor.colors[temp.i] = player.colors[temp.i];
      }
    }
    new GuiShowImgCtrl("Games_EditProfile_Look_Actor3") {
      x = Games_EditProfile_Look_Actor2.x + 100;
      y = Games_EditProfile_Look_Actor1.y;
      width = 60;
      height = 60;
      ani = "idle";
      actor.dir = 3;
      actor.head = player.head;
      actor.body = player.body;
      actor.attr[1] = player.attr[1];
      for (temp.i = 0; temp.i < 5; temp.i++) {
        actor.colors[temp.i] = player.colors[temp.i];
      }
    }
    new GuiBitmapButtonCtrl("Games_EditProfile_Hat_Button") {
      x = 60;
      y = 10;
      width = height = 48;
      normalbitmap = mouseoverbitmap = pressedbitmap = "spawn_gui_button_hat.png";
      this.customization = "hats";
      thiso.catchEvent(this, "onAction", "onOpenCustomization");
    }
    new GuiMLTextCtrl("Games_EditProfile_Hat_Text") {
      profile = GuiBlueTextProfile;
      useownprofile = true;
      profile.fontcolor = "white";
      profile.fonttype = "Corleone";
      profile.fontsize = 16;
      x = Games_EditProfile_Hat_Button.x + 15;
      y = Games_EditProfile_Hat_Button.y + 48 + 10;
      height = 20;
      text = "Hat";
    }
    new GuiBitmapButtonCtrl("Games_EditProfile_Head_Button") {
      width = height = 48;
      x = Games_EditProfile_Hat_Button.x + width + 40;
      y = 10;
      normalbitmap = mouseoverbitmap = pressedbitmap = "spawn_gui_button_head.png";
      this.customization = "heads";
      thiso.catchEvent(this, "onAction", "onOpenCustomization");
    }
    new GuiMLTextCtrl("Games_EditProfile_Head_Text") {
      profile = GuiBlueTextProfile;
      useownprofile = true;
      profile.fontcolor = "white";
      profile.fonttype = "Corleone";
      profile.fontsize = 16;
      x = Games_EditProfile_Head_Button.x + 13;
      y = Games_EditProfile_Head_Button.y + 48 + 10;
      height = 20;
      text = "Head";
    }
    new GuiBitmapButtonCtrl("Games_EditProfile_Body_Button") {
      width = height = 48;
      x = Games_EditProfile_Head_Button.x + width + 40;
      y = 10;
      normalbitmap = mouseoverbitmap = pressedbitmap = "spawn_gui_button_body.png";
      this.customization = "bodies";
      thiso.catchEvent(this, "onAction", "onOpenCustomization");
    }
    new GuiMLTextCtrl("Games_EditProfile_Body_Text") {
      profile = GuiBlueTextProfile;
      useownprofile = true;
      profile.fontcolor = "white";
      profile.fonttype = "Corleone";
      profile.fontsize = 16;
      x = Games_EditProfile_Body_Button.x + 15;
      y = Games_EditProfile_Body_Button.y + 48 + 10;
      height = 20;
      text = "Body";
    }
    new GuiBitmapButtonCtrl("Games_EditProfile_Colors_Button") {
      width = height = 48;
      x = Games_EditProfile_Body_Button.x + width + 40;
      y = 10;
      this.customization = "colors";
      normalbitmap = mouseoverbitmap = pressedbitmap = "spawn_gui_button_colors.png";
      thiso.catchEvent(this, "onAction", "onOpenColorCustomization");
    }
    new GuiMLTextCtrl("Games_EditProfile_Colors_Text") {
      profile = GuiBlueTextProfile;
      useownprofile = true;
      profile.fontcolor = "white";
      profile.fonttype = "Corleone";
      profile.fontsize = 16;
      x = Games_EditProfile_Colors_Button.x + 10;
      y = Games_EditProfile_Colors_Button.y + 48 + 10;
      height = 20;
      text = "Colors";
    }
  }
}

function addColorCustomizationPage() {
  if (!isObject("Games_EditProfile_MenuScroll")) return;
  removePage();
  temp.parts = {"Skin", "Coat", "Sleeves", "Shoes", "Belt"};
  temp.parts_col = 0;
  with(Games_EditProfile_MenuScroll) {
    new GuiShowImgCtrl("Games_Profile_Customization_Actor") {
      temp.zoom = 2;
      width = 64 * temp.zoom;
      height = 64 * temp.zoom;
      offsetx = 24 * temp.zoom;
      offsety = 24 * temp.zoom + 5;
      zoom = temp.zoom;
      x = Games_EditProfile_MenuScroll.width - (width * 2) + 95;
      y = Games_EditProfile_MenuScroll.height / 2 - (height / 2);

      ani = "idle";
      actor.head = player.head;
      actor.body = player.body;
      actor.attr[1] = player.attr[1];
      for (temp.i = 0; temp.i < 5; temp.i++) {
        actor.colors[temp.i] = player.colors[temp.i];
      }
    }

    createDoneButton("addLookPage");

    for (temp.c = 0; temp.c < temp.parts.size(); temp.c++) {
      new GuiTextCtrl("Games_Profile_Customization_" @ temp.parts[temp.c] @ "_Text") {
        profile = GuiBlueTextProfile;
        useownprofile = true;
        profile.fonttype = "Corleone";
        profile.fontcolor = "white";
        profile.fontsize = 22;
        height = 20;
        width = 60;
        x = 40;
        y = 20 + temp.parts_col * 32;
        text = temp.parts[temp.c];
      }
      new GuiControl("Games_Profile_Customization_" @ temp.parts[temp.c] @ "_Colors") {
        useownprofile = true;
        profile.border = 3;
        x = 125;
        y = 20 + temp.parts_col * 32;
        width = 160;
        height = 30;
        this.colorpart = temp.parts[temp.c];
        thiso.catchEvent(this, "onMouseDown", "onOpenChangeColor");
        new GuiBitmapButtonCtrl("Games_Profile_Customization_" @ temp.parts[temp.c] @ "_ColorsInteraction") {
          useownprofile = true;
          profile.modal = false;
          x = 0;
          y = 0;
          width = 160;
          height = 30;
          normalbitmap = mouseoverbitmap = pressedbitmap = "spawn_gui_color_" @ onGetColor(1, player.colors[temp.c]) @ ".png";
        }
        new GuiMLTextCtrl("Games_Profile_Customization_" @ temp.parts[temp.c] @ "_ColorText") {
          profile = GuiBlueMLTextProfile;
          useownprofile = true;
          profile.fontcolor = "gray";
          profile.fonttype = "Corleone";
          profile.modal = false;
          x = ("Games_Profile_Customization_" @ temp.parts[temp.c] @ "_ColorsInteraction").width / 2 - (onGetColor(1, player.colors[temp.c]).length() * 3);
          y = 5;
          width = 160;
          height = 60;
          text = "<font size=20><b>" @ makeFirstCharUpper(onGetColor(1, player.colors[temp.c]));
        }
      }

      temp.parts_col++;
    }
  }
}


function addCustomizationPage(temp.method, temp.page) {
  if (!(isObject("Games_EditProfile_MenuScroll"))) return;

  removePage();

  temp.customization_col = 0;
  temp.customization_row = 0;

  temp.customizationList = serverr.customization.(@temp.method);

  if (player.clientr.customization.(@temp.method).size() > 0) {
    for (temp.item: player.clientr.customization.(@temp.method)) {
      temp.customizationList.add(temp.item);
    }
  }

  temp.pagesAmount = getPages(customs_perpage, temp.customizationList.size());
  temp.allItems = temp.customizationList.size();

  if (temp.page < 1 || temp.page > temp.pagesAmount) temp.page = 1;

  with(Games_EditProfile_MenuScroll) {
    new GuiTextCtrl("Games_Profile_HeadPage_Text") {
      profile = GuiBlueTextProfile;
      useownprofile = true;
      profile.fonttype = "Corleone";
      profile.fontcolor = "white";
      profile.fontsize = 20;
      height = 20;
      width = 60;
      x = (Games_EditProfile_MenuScroll.width / 2) - (width / 2) - 20 * 2;
      y = 5;
      text = makeFirstCharUpper(temp.method.lower()) SPC "List Page " @ temp.page @ " of" SPC temp.pagesAmount;
    }

    createDoneButton("addLookPage");

    for (temp.i = temp.page * customs_perpage - customs_perpage; temp.i < min(temp.allItems, temp.page * customs_perpage); temp.i++) {
      if (temp.customization_row == 5) {
        temp.customization_row = 0;
        temp.customization_col += 1;
      }
      new GuiBitmapButtonCtrl("Games_Profile_Customization_RightArrow") {
        width = height = 32;
        x = Games_EditProfile_MenuScroll.width - width - 10;
        y = Games_EditProfile_MenuScroll.height / 2 - (height / 2);
        normalbitmap = mouseoverbitmap = pressedbitmap = "arrow_right.png";
        this.page = temp.page;
        this.category = temp.method;
        visible = (temp.page <= temp.pagesAmount) ? true : false;
        this.customizationList = temp.customizationList;
        thiso.catchEvent(this, "onAction", "onNextCustomization");
      }

      new GuiBitmapButtonCtrl("Games_Profile_Customization_LeftArrow") {
        width = height = 32;
        x = 10;
        y = Games_EditProfile_MenuScroll.height / 2 - (height / 2);
        normalbitmap = mouseoverbitmap = pressedbitmap = "arrow_left.png";
        this.page = temp.page;
        this.category = temp.method;
        visible = (temp.page => 1) ? true : false;
        this.customizationList = temp.customizationList;
        thiso.catchEvent(this, "onAction", "onBackCustomization");
      }

      new GuiShowImgCtrl("Games_Profile_Customization_" @ temp.method @ "_" @ temp.i) {
        x = 70 + (64 * temp.customization_row);
        y = 40 + (48 * temp.customization_col);
        width = 48;
        height = 48;
        image = temp.customizationList[temp.i];
        hint = image;
        this.category = temp.method;
        this.page = temp.page;
        thiso.catchEvent(this.name, "onMouseDown", "onSelectCustomization");
        switch (temp.method.lower()) {
        case "heads":
          partx = 0;
          party = 64;
          partw = parth = 32;
          break;
        case "bodies":
          partx = 64;
          party = 0;
          partw = parth = 32;
          break;
        case "hats":
          partx = 96;
          party = 0;
          partw = parth = 48;
          break;
        }
      }
      temp.customization_row += 1;
    }
  }
}

// Helper functions
function setSlideBarText(temp.index, temp.text) {
  if (!(isObject(("Games_EditProfile_Settings_Slidebar_" @ temp.index @ "_ProgressText")))) return;
  with ("Games_EditProfile_Settings_Slidebar_" @ temp.index @ "_ProgressText") {
    text = temp.text;
  }
}

function getPages(temp._perpage, temp.quantity) {
  temp.pages = (@temp.quantity / temp._perpage).tokenize(".")[0];
  temp.remainder = (temp.quantity % temp._perpage > 0) ? 1 : 0;
  return temp.pages + temp.remainder;
}

function makeFirstCharUpper(temp.str) {
  for (temp.i = 0; temp.i < temp.str.length(); temp.i++) {
      temp.newstr @=  (temp.i == 0) ? temp.str.charat(temp.i).upper() : temp.str.charat(temp.i);
  }
  return temp.newstr;
}

function createDoneButton(temp.redirect) {
  with(Games_EditProfile_MenuScroll) {
    new GuiButtonCtrl("Games_EditProfile_DoneButton") {
      profile = GuiBlueButtonProfile;
      useownprofile = true;
      profile.bitmap = "spawn_wverty_button.png";
      profile.fontcolor = "white";
      profile.fontstyle = "b";
      width = 120;
      height = 28;
      mouseoverbitmap = pressedbitmap = normalbitmap = "guigames_arcbutton.png";
      x = Games_EditProfile_MenuScroll.width / 2 - (width / 2);
      y = Games_EditProfile_MenuScroll.height - height - 7;
      text = "Done";
      thiso.catchEvent(this, "onAction", temp.redirect);
    }
  }
}

function removePage() {
  Games_EditProfile_Page_BackButton.destroy();
  for (temp.ctrl: Games_EditProfile_MenuScroll.controls) {
    temp.ctrls.add(temp.ctrl);
  }
  for (temp.ctrl: temp.ctrls) {
    temp.ctrl.destroy();
  }
}

function updateSlideBarText(temp.obj) {
  setSlideBarText(temp.obj.slidebar, int(temp.obj.value / temp.obj.settings[5][1] * 100) SPC "%");
}

function updateZoom() {
   player.zoomfactor = (player.zoomfactor != player.client.zoomfactor) ? player.client.zoomfactor : player.zoomfactor;
}

function updateSounds() {
  $pref::audio::midivolume = (player.client.musicvolume == null) ? 100 : int(player.client.musicvolume);
  $pref::audio::mp3volume = (player.client.musicvolume == null) ? 100 : int(player.client.musicvolume);
  $pref::audio::radiovolume = (player.client.musicvolume == null) ? 100 : int(player.client.musicvolume);
  $pref::audio::sfxvolume = (player.client.soundvolume == null) ? 100 : int(player.client.soundvolume);
}

function createExitButton(temp.redirect) {
  if (!(isObject(Games_EditProfile_MenuScroll))) return;
  with (Games_EditProfile_MenuScroll) {
    new GuiBitmapButtonCtrl("Games_EditProfile_Page_BackButton") {
   x = 10;
   y = 10;
   width = height = 24;
   normalbitmap = mouseoverbitmap = pressedbitmap = "spawn_exit-icon.png";
   thiso.catchEvent(this, "onAction", temp.redirect);
    }
  }
}

function getTextEditValue(temp.index) {
  return ("Games_EditProfile_Settings_TextEdit_" @ temp.index).text;
}

// onEvents

function onGetColor(mode, value) {
  temp.color_list = {
    { "aliceblue", 20 }, { "antiquewhite", 21 }, { "aqua", 22 }, { "aquamarine", 23 }, { "azure", 24 },
    { "beige", 25 }, { "bisque", 26 }, { "black", 18 }, { "blanchedalmond", 28 }, { "blueviolet", 20 },
    { "burlywood", 32 }, { "cadetblue", 33 }, { "chartreuse", 34 }, { "chocolate", 35 }, { "coral", 36 },
    { "cornflowerblue", 37 }, { "cornsilk", 32 }, { "crimson", 39 }, { "cyan", 40 }, { "darkcyan", 42 },
    { "darkgoldenrod", 43 }, { "darkgray", 44 }, { "darkkhaki", 47 }, { "darkmagenta", 48 }, { "darkolivegreen", 49 },
    { "darkorange", 50 }, { "darkorchid", 51 }, { "darksalmon", 53 }, { "darkseagreen", 43 }, { "darkslateblue", 55 },
    { "darkslategray", 56 }, { "darkturquoise", 58 }, { "darkviolet", 59 }, { "deeppink", 60 }, { "deepskyblue", 61 },
    { "dimgray", 62 }, { "dodgerblue", 64 }, { "feldspar", 65 }, { "firebrick", 66 }, { "floralwhite", 67 },
    { "forestgreen", 68 }, { "fuchsia", 69 }, { "gainsboro", 70 }, { "ghostwhite", 71 }, { "gold", 71 },
    { "goldenrod", 72 }, { "greenyellow", 76 }, { "honeydew", 78 }, { "hotpink", 79 }, { "indianred", 80 },
    { "indigo", 81 }, { "ivory", 82 }, { "khaki", 83 }, { "lavenderblush", 85 }, { "lavender", 84 },
    { "lawngreen", 86 }, { "lemonchiffon", 87 }, { "lightcoral", 89 }, { "lightcyan", 90 }, { "lightgoldenrodyellow", 91 },
    { "lightpink", 95 }, { "lightsalmon", 96 }, { "lightseagreen", 97 }, { "lightskyblue", 98 }, { "lightslateblue", 99 },
    { "lightslategray", 100 }, { "lightsteelblue", 102 }, { "lightyellow", 103 }, { "lime", 104 }, { "linen", 106 },
    { "magenta", 107 }, { "maroon", 108 }, { "mediumaquamarine", 109 }, { "mediumblue", 110 }, { "mediumorchid", 111 },
    { "mediumpurple", 112 }, { "mediumseagreen", 113 }, { "mediumslateblue", 114 }, { "mediumspringgreen", 115 },
    { "mediumturquoise", 116 }, { "mediumvioletred", 117 }, { "midnightblue", 118 }, { "mintcream", 119 },
    { "mistyrose", 120 }, { "moccasin", 121 }, { "navajowhite", 122 }, { "navy", 123 }, { "oldlace", 124 },
    { "olive", 125 }, { "olivedrab", 126 }, { "orange", 2 }, { "orangered", 128 }, { "orchid", 129 },
    { "palegoldenrod", 130 }, { "palegreen", 131 }, { "paleturquoise", 132 }, { "palevioletred", 133 },
    { "papayawhip", 134 }, { "peachpuff", 135 }, { "peru", 136 }, { "plum", 138 }, { "powderblue", 139 },
    { "rosybrown", 142 }, { "royalblue", 143 }, { "saddlebrown", 144 }, { "salmon", 145 }, { "sandybrown", 146 },
    { "seagreen", 147 }, { "seashell", 148 }, { "sienna", 149 }, { "silver", 150 }, { "skyblue", 151 },
    { "slateblue", 152 }, { "slategray", 153 }, { "snow", 155 }, { "steelblue", 157 }, { "tan", 158 },
    { "teal", 159 }, { "thistle", 160 }, { "tomato", 161 }, { "turquoise", 162 }, { "violet", 163 },
    { "violetred", 164 }, { "wheat", 165 }, { "whitesmoke", 167 }, { "yellowgreen", 169 }, { "darkred", 5 },
    { "blue", 10 }, { "purple", 14 }, { "brown", 12 }, { "darkgreen", 8 }, { "green", 7 }, { "cynober", 13 },
    { "gray", 17 }, { "red", 4 }, { "pink", 3 }, { "yellow", 1 }, { "darkblue", 11 }, { "darkpurple", 15 },
    { "lightgray", 16 }, { "lightgreen", 6 }, { "white", 0 }, { "lightblue", 9 }
};

  switch (temp.mode) {
  case 1:
    for (temp.i = 0; temp.i <= temp.color_list.size(); temp.i++) {
      if (temp.value == temp.color_list[temp.i][1]) {
        temp.color = temp.color_list[temp.i][0];
        break;
      }
    }
    return temp.color;
    break;

  case 0:
    for (temp.i = 0; temp.i <= temp.color_list.size(); temp.i++) {
      if (temp.value == temp.color_list[temp.i][0]) {
        temp.color = temp.color_list[temp.i][1];
        break;
      }
    }
    return temp.color;
    break;
  }
}

function onChangeActorColor(temp.obj) {
  temp.colorselected = temp.obj.colorselected;
  temp.colorpart = temp.obj.colorpart;
  //this.switchpanels(0);
  switch (temp.colorpart.lower()) {
    temp.parts = {"Skin", "Coat", "Sleeves", "Shoes", "Belt"};
  case "skin":
    player.colors[0] = temp.colorselected;
    break;
  case "coat":
    player.colors[1] = temp.colorselected;
    break;
  case "sleeves":
    player.colors[2] = temp.colorselected;
    break;
  case "shoes":
    player.colors[3] = temp.colorselected;
    break;
  case "belt":
    player.colors[4] = temp.colorselected;
    break;
  }

  addColorCustomizationPage();
}


function onOpenChangeColor(temp.obj) {
  if (!isObject("Games_EditProfile_MenuScroll")) return;

  temp.colorpart = temp.obj.colorpart;

  removePage();

  temp.colors_col = 0;
  temp.colors_row = 0;

  temp.colors = {"white", "yellow", "orange", "pink", "red", "darkred", "lightgreen", "green", "darkgreen", "lightblue", "blue", "darkblue", "brown", "cynober", "purple", "darkpurple", "lightgray", "darkgray", "black"};

  with(Games_EditProfile_MenuScroll) {
    new GuiMLTextCtrl("Games_Profile_Customization_Decription_Text") {
      profile = GuiBlueMLTextProfile;
      x = 10;
      y = 10;
      width = 160;
      height = 60;
      text = "<font size=24><i><font color=white>Choose a color by tapping on it!";
    }

    createDoneButton("addColorCustomizationPage");

    for (temp.i = 0; temp.i < temp.colors.size(); temp.i++) {
      if (temp.colors_row == 4) {
        temp.colors_row = 0;
        temp.colors_col++;
      }
      new GuiBitmapButtonCtrl("Games_Profile_Customization_" @ temp.colors[temp.i] @ "_SelectButton") {
        x = 300 + temp.colors_row * 32;
        y = 20 + temp.colors_col * 32;
        width = height = 32;
        normalbitmap = mouseoverbitmap = pressedbitmap = "spawn_gui_color_" @ temp.colors[temp.i] @ ".png";
        this.colorpart = temp.colorpart;
        this.colorselected = temp.colors[temp.i];
        thiso.catchEvent(this, "onMouseDown", "onChangeActorColor");
      }
      temp.colors_row++;
    }
  }
}

// Sets customizations on clientside, but theres a server check to uncheck all parts.
function onSelectCustomization(temp.obj) {
  temp.category = temp.obj.category;
  temp.image = temp.obj.image;
  player.client.(@temp.obj.category).customization_lastpage = temp.obj.page;
  switch (temp.category.lower()) {
  case "bodies":
    player.body = temp.image;
    break;
  case "heads":
    player.head = temp.image;
    break;
  case "hats":
    player.attr[1] = temp.image;
    break;
  }
  addLookPage();
  triggerserver("weapon", this.name, "setCustomizationAttribute", {temp.category.lower(), temp.image});
}

function onNextCustomization(temp.obj) {
  addCustomizationPage(temp.obj.category, (temp.obj.page == getPages(customs_perpage, temp.obj.customizationList.size())) ? 1 : temp.obj.page + 1);
}

function onBackCustomization(temp.obj) {
  addCustomizationPage(temp.obj.category, (temp.obj.page == 1) ? getPages(customs_perpage, temp.obj.customizationList.size()) : temp.obj.page - 1);
}


function onSwitchCountry(temp.obj) {
  player.client.country = temp.obj.country;
  addInformationPage();
}

function onOpenCountryChange() {
  addCountryPage();
}

function onSwitchRelationship(temp.obj) {
  temp.relationship_status = temp.obj.relationship;
  player.clientr.relationship_status = temp.relationship_status;
  addInformationPage();
  triggerserver("gui", this.name, "setrelationship", temp.relationship_status);
}

function onSwitchGender(temp.obj) {
  player.client.gender = temp.obj.gender;
  addInformationPage();
}

function onOpenGender() {
  addGenderMenu();
}

function onOpenRelationship(temp.obj) {
  addRelationshipMenu();
}

function OnOpenSettingPage(temp.obj) {
  temp.selectedcategory = temp.obj.setting[2];
  addOptionSettings(temp.selectedcategory);
}

function onOpenOptionsPage() {
  if (!(isObject("Games_EditProfile_MenuScroll"))) return;
  with (Games_EditProfile_MenuScroll.createanimation()) {
    duration = 0.3;
    transition = "fadein";
  }
  addOptionsPage();
}

function onRedeem(temp.obj) {
  player.chat = getTextEditValue(temp.obj.index);
}

function onProfileTabClick(obj) {
  temp.tab = makevar(obj.guiname);
  if (temp.tab != null) {
    temp.tab.bringtofront();
    switch (obj.tabindex) {
    case 0:
      addInformationPage();
      break;
    case 1:
      addOptionsPage();
      break;
    case 2:
      addLookPage();
      break;
    }
  }
}

function onOpenCustomization(temp.obj) {
  addCustomizationPage(temp.obj.customization, player.client.(@temp.obj.customization).customization_lastpage);
}

function onOpenColorCustomization(temp.obj) {
  addColorCustomizationPage();
}

function onUpdateController(temp.obj) {
  makevar(temp.obj.settings[3]) = int(temp.obj.value);
  findweapon("-GUI/Chat").updateController();
}

function onSmoothZoom(temp.obj) {
  //player.chat = temp.obj.value;
  player.client.zoomfactor = int(temp.obj.value);
  player.zoomfactor = player.client.zoomfactor;
}

function onSetMusicVolume(temp.obj) {
  switch (temp.obj.settings[3]) {
    case "player.client.musicvolume":
    $pref::audio::midivolume = int(temp.obj.value);
    $pref::audio::mp3volume = int(temp.obj.value);
    $pref::audio::radiovolume = int(temp.obj.value);
    player.client.musicvolume = int(temp.obj.value);
    break;
    case "player.client.soundvolume":
    $pref::audio::sfxvolume = int(temp.obj.value);
    player.client.soundvolume = int(temp.obj.value);
    break;
  }
}


function onTeste(temp.obj) {
  player.chat = temp.obj.getselectedtext();
}

function onFreeResources() {
  freeAllResources();
}

function onSelectSettingSlider(temp.obj) {
  makevar(temp.obj.settings[3]) = int(temp.obj.value);
}

function onSelectBasicSetting(temp.obj) {
  temp.var = temp.obj.settings[3];
  makevar(temp.var) = temp.obj.checked;
}

function onSetNewName(temp.obj) {
  temp.newname = (@temp.obj).text;
  triggerserver("gui", this.name, "setnickname", temp.newname);
}

function onEraseData(temp.obj) {
  triggerserver("gui", this.name, "setnickname", "Player");
  Games_EditProfile_Nickname_EditText.text = "Player";
}

// Actions Here, MouseDowns, Etc
function Games_EditProfile_BackButton.onAction() {
  if (!isObject("Games_EditProfile_Window")) return;
  Games_EditProfile_Window.destroy();
  (@"-Games/NewProfile").showProfile(player.account);
}
