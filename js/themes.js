function load_theme(theme) {
    switch (theme) {
        case "room":
    


   

    
    build("flat", 0, room_height, 2500, 4000, 3000, 0, "night", "night", true);
    build("flat", 0, 100, 0, 2000, 200, 0, "wall_front_u");
    build("flat", 0, room_height-36, 0, 2000, 72, 0, "wall_front_o");
    build("flat", -900, 349, 0, 200, 300, 0, "wall_front_l");
    build("flat", -150, 349, 0, 200, 300, 0, "wall_front_m");
    build("flat", 800, 349, 0, 400, 300, 0, "wall_front_r");
    group(["flat_wall_front_u", "flat_wall_front_o", "flat_wall_front_l", "flat_wall_front_m", "flat_wall_front_r"], "wall_front", 2000, room_height, "wall");
    move("group_wall_front", 0, 3, 1005, 0, 0, 0);
    
    build("flat", -1008, room_height/2, 0, 2000, room_height, 0, "wall_left", "wall");
    move("flat_wall_left", 0, 3, 0, 0, 90, 0);
    
    copy("flat_wall_left", "flat_wall_right");
    move("flat_wall_right", 2016, 0, 0, 0, 180, 0);
    
    build("flat", 0, room_height/2, 0, 2000, room_height, 0, "wall_back", "wall");
    move("flat_wall_back", 0, 3, -1005, 0, 180, 0);
    
    build("flat", 0, 0, 0, 2000, 2000, 0, "ceiling");
    move("flat_ceiling", 0, room_height+5, 0, -90, 0, 0);
    
    build("flat", 0, 0, 0, 2000, 2000, 0, "floor");
    move("flat_floor", 0, -6, 0, 90, 0, 0);
    
    build("flat", -700, 0, -700, 600, 600, 0, "fireplace_floor");
    move("flat_fireplace_floor", 0, -2, 0, 90, 0, 0);

    build("flat", 0, 0, 0, 640, 960, 0, "carpet");
    move("flat_carpet", -50, -3, 100, 90, 0, 0);
    
    build("flat", 0, 0, 0, 1960, 10, 0, "baseboard_front");
    move("flat_baseboard_front", 0, 3, 998, 45, 0, 0);
    
    build("flat", 0, 0, 0, 1960, 10, 0, "baseboard_back");
    move("flat_baseboard_back", 0, 8, -990, 135, 0, 0);
    
    build("flat", 0, 0, 0, 10, 1960, 0, "baseboard_left");
    move("flat_baseboard_left", -988, 10, 0, 90, 45, 0);
    
    build("flat", 0, 0, 0, 10, 1960, 0, "baseboard_right");
    move("flat_baseboard_right", 990, 8, 0, -90, 225, 0);
    
    build("flat", 0, 310, 0, 550, 20, 0, "window_frame1", "window_frame"); //left top
    build("flat", 0, 10, 0, 550, 20, 0, "window_frame2", "window_frame"); //left bottom
    build("flat", -10, 160, 0, 280, 20, 0, "window_frame3", "window_frame"); //left middle l
    build("flat", 10, 160, 0, 280, 20, 0, "window_frame4", "window_frame"); //left middle 3
    move("flat_window_frame3", 0, 0, 0, 0, 0, 90);
    move("flat_window_frame4", 0, 0, 0, 0, 0, 90);
    group(["flat_window_frame1", "flat_window_frame2", "flat_window_frame3", "flat_window_frame4"], "window1", 550, 320);
    copy("group_window1", "group_window2");
    move("group_window1", -525, 200, 1000, 0, 0, 0);
    move("group_window2", 300, 200, 999, 0, 0, 0);
    
    
    build("block", 0, 0, 0, 450, 70, 170, "couch_base");
    build("block", -217, 74, -25, 20, 20, 120, "couch_rest_l");
    build("block", 217, 74, -25, 20, 20, 120, "couch_rest_r");
    build("block", 0, 75, 60, 450, 120, 50, "couch_back");
    move("block_couch_back", 0, 0, 10, 10, 0, 0);
    dropshadow("group_couch1_1", 0, 2, -85, 180, 450, 25, -70, false); //floor front
    dropshadow("group_couch1_2", -225, 0, 0, -90, 200, 70, 20, false); //floor left
    dropshadow("group_couch1_3", 195, 72, -85, 0, 30, 125, 0, false); //rest r
    group(["block_couch_base", "block_couch_rest_l", "block_couch_rest_r", "block_couch_back", "dropshadow_group_couch1_1", "dropshadow_group_couch1_2", "dropshadow_group_couch1_3",], "couch", 450, 210);
    move("group_couch", -675, 3, 845, 0, 0, 0);
    
    document.getElementById("group_couch").addEventListener("click", function() { animate_move("group_couch", 1, "ease-in-out", 400, 0, 0, 0, 0, 0, true); });
    
    
    build("block", 0, 0, 0, 450, 70, 200, "couch_base2");
    build("block", -217, 73, 25, 20, 20, 150, "couch_rest_l2");
    build("block", 217, 73, 25, 20, 20, 150, "couch_rest_r2");
    build("block", 0, 78, -80, 450, 120, 50, "couch_back2");
    move("block_couch_back2", 0, 0, -10, -10, 0, 0);
    group(["block_couch_base2", "block_couch_rest_l2", "block_couch_rest_r2", "block_couch_back2"], "couch2", 450, 210);
    move("group_couch2", -675, 4, 290, 0, 0, 0);
    
    
    build("block",  0, 80,  0,  300, 10, 120, "table2");
    build("block", -145, 0,  55, 10, 80, 10, "table2_leg_tl");
    build("block",  145, 0,  55, 10, 80, 10, "table2_leg_tr");
    build("block",  145, 0, -55, 10, 80, 10, "table2_leg_br");
    build("block", -145, 0, -55, 10, 80, 10, "table2_leg_bl");
    group(["block_table2", "block_table2_leg_tl", "block_table2_leg_tr", "block_table2_leg_br", "block_table2_leg_bl"], "table2", 120, 90, "table2");
    move("group_table2", -670, 2, 530, 0, 0, 0);
    
    
    build("block", -960, 400, -100, 50, 6, 400, "bookshelf");
    build("block", -960, 407, -100, 50, 60, 400, "books", "books");
    build("block", -960, 300, -100, 50, 6, 400, "bookshelf2");
    build("block", -960, 307, -100, 50, 60, 400, "books2", "books");
    
    
    build("flat", -995, 310, 530, 300, 420, 0, "ledzep");
    move("flat_ledzep", 0, 0, 0, 0, 90, 0);
    build("block", -994, 530, 530, 10, 10, 60, "spot_ledzep");
    build("tube", 0, 0, 0, 30, 7, 20, "ashtray", "tube", false);
    move("tube_ashtray", -670, 101, 535, 0, 130, 0);
    
    build("tube", -600, 105, 560, 25, 20, 24, "cup", "tube", false);
    move("tube_cup", 0, 0, 0, 0, 130, 0);
    
    build("block", 0, 0, 0, 2, 2, 20, "cigarette");
    move("block_cigarette", -675, 105, 535, -90, 70, 0);
    build("flat", 0, 0, 0, 15, 100, 0, "smoke", "flat", true);
    move("flat_smoke", -665, 155, 535, 0, 70, 0);
    
    build("flat", 0, 0, 0, 50, parseInt(50*Math.sqrt(2)), 0, "sheet1", "flat", true);
    move("flat_sheet1", -740, 97, 552, 90, 0, 180);
    build("flat", 0, 0, 0, 50, parseInt(50*Math.sqrt(2)), 0, "sheet2", "flat", true);
    move("flat_sheet2", -735, 99, 560, 90, 0, 170);
    
    
    document.getElementById("flat_sheet2").addEventListener("click", function() { add_to_inventory("flat_sheet2") });
    
    
    
    
    /*
    build("block",  0, 150,  0,  190, 20, 400, "table3");
    build("block", -85, 0,  190, 20, 150, 20, "table3_leg_tl");
    build("block",  85, 0,  190, 20, 150, 20, "table3_leg_tr");
    build("block",  85, 0, -190, 20, 150, 20, "table3_leg_br");
    build("block", -85, 0, -190, 20, 150, 20, "table3_leg_bl");
    group(["block_table3", "block_table3_leg_tl", "block_table3_leg_tr", "block_table3_leg_br", "block_table3_leg_bl"], "table3", 120, 90, "table3");
    move("group_table3", 400, 2, 630, 0, 40, 0);
    */
    
    /*
    build("flat", -650, 165, 600, 190, 180, 0, "smoking", "flat", true);
    move("flat_smoking", 0, 0, 0, 0, 0, 0);
    */
    
    build("block", 0, 0, 0, 120, 10, 120, "lamp_base", "block", false)
    build("tube", 0, 26, 0, 100, 30, 30, "lamp1", "lamp", false);
    build("tube", 0, 76, 0, 125, 70, 30, "lamp2", "lamp", false);
    build("tube", 0, 160, 0, 150, 100, 30, "lamp3", "lamp", false);
    build("tube", 0, 245, 0, 125, 70, 30, "lamp4", "lamp", false);
    build("tube", 0, 296, 0, 100, 30, 30, "lamp5", "lamp", false);
    group(["block_lamp_base", "tube_lamp1", "tube_lamp2", "tube_lamp3", "tube_lamp4", "tube_lamp5"], "lamp_front", 150, 300);
    move("group_lamp_front", -150, 0, 880, 0, 0, 0);
    
    
    build("tube", 0, 0, 0, 6, 800, 20, "curtain_rail1", "tube", false);
    move("tube_curtain_rail1", -160, 127, 985, -90, 0, 90);
    build("tube", 0, 0, 0, 6, 800, 20, "curtain_rail2", "tube", false);
    move("tube_curtain_rail2", 660, 127, 990, -90, 0, 90);
    build("flat", -820, 330, 975, 200, 400, 0, "curtain1", "curtain");
    build("flat", -280, 330, 975, 200, 400, 0, "curtain2", "curtain");
    build("flat", -20, 330, 975, 200, 400, 0, "curtain3", "curtain");
    build("flat", 520, 330, 975, 200, 400, 0, "curtain4", "curtain");
    
    dropshadow("flat_curtain1", 0, 0, 0, 0, 215, 420, 0, false);
    move("dropshadow_flat_curtain1", -850, 135, 990, -90, 0, 0);
    dropshadow("flat_curtain2", 0, 0, 0, 0, 215, 420, 0, false);
    move("dropshadow_flat_curtain2", -300, 135, 995, -90, 0, 0);
    dropshadow("flat_curtain3", 0, 0, 0, 0, 215, 420, 0, false);
    move("dropshadow_flat_curtain3", -5, 135, 995, -90, 0, 0);
    dropshadow("flat_curtain4", 0, 0, 0, 0, 215, 420, 0, false);
    move("dropshadow_flat_curtain4", 570, 135, 995, -90, 0, 0);
    
    build("tube", -350, 51, 540, 100, 100, 45, "seat1");
    move("tube_seat1", 0, 2, 0, 0, 150, 0);
    
    video(0, 300, 0, 320, 180, "danke_sogn", "video/solo_short.mp4", "video");
    move("video_danke_sogn", 1005, 100, 700, 0, -90, 0);
    // STAGE
    
    
    build("block", 0, 0, 0, 600, 40, 1200, "stage_base");
    
    build("tube", -150, 161, 0, 4, 220, 8, "micstand_1", "micstand"); //vertical rail
    move("tube_micstand_1", 0, 0, 0, 0, -30, 0);
    dropshadow("tube_micstand_1", -140, 42, 20, 15, 5, 250, 0, false);
    
    build("tube", -150, 15, 64, 4, 60, 8, "micstand_2", "micstand"); //legs
    move("tube_micstand_2", 0, 0, 0, 95, 0, 0);
    dropshadow("tube_micstand_2", -140, 42, 20, -12, 5, 45, 0, false);
    build("tube", -147, 20, 0, 4, 60, 8, "micstand_3", "micstand");
    move("tube_micstand_3", 0, 0, 0, 80, 0, -60);
    dropshadow("tube_micstand_3", -140, 42, 20, 140, 5, 65, 0, false);
    build("tube", -206, 16, -30, 4, 60, 8, "micstand_4", "micstand");
    move("tube_micstand_4", 0, 0, 0, -100, 180, 60);
    dropshadow("tube_micstand_4", -140, 42, 20, 232, 5, 80, 0, false);
    
    build("tube", -149, 175, 64, 4, 150, 8, "micstand_5", "micstand"); //top rail
    move("tube_micstand_5", 0, 0, 0, 110, 30, 0);
    dropshadow("tube_micstand_5", -90, 42, 350, 170, 5, 200, 0, false);
    
    build("tube", -135, 289, -81, 8, 30, 40, "mic", "micstand", true); //mic 
    move("tube_mic", 0, 0, 0, 50, 0, 90);
    dropshadow("tube_mic", -70, 42, 155, 105, 5, 30, 0, false);
    
    group(["tube_micstand_1", "tube_micstand_2", "tube_micstand_3", "tube_micstand_4", "tube_micstand_5", "tube_mic", "dropshadow_tube_micstand_1", "dropshadow_tube_micstand_2", "dropshadow_tube_micstand_3", "dropshadow_tube_micstand_4", "dropshadow_tube_micstand_5", "dropshadow_tube_mic"], "microphone", 100, 150);
    move("group_microphone", 80, 0, 80, 0, 0, 0);
    
    build("block", 0, 0, 0, 50, 20, 30, "spot1", "spot", true);
    build("flat", -30, 28, 0, 20, 30, 0, "cover1", "spot_cover", true);
    move("flat_cover1", 0, 0, 0, 90, 240, 180);
    build("flat", -30, 10, -24, 20, 20, 0, "cover2", "spot_cover", true);
    move("flat_cover2", 0, 0, 0, 0, 240, 180);
    build("flat", -30, -10, 0, 20, 30, 0, "cover3", "spot_cover", true);
    move("flat_cover3", 0, 0, 0, 90, -60, 0);
    build("flat", -30, 0, 24, 20, 20, 0, "cover4", "spot_cover", true);
    move("flat_cover4", 0, 10, 0, 0, -60, 0);
    group(["block_spot1", "flat_cover1", "flat_cover2", "flat_cover3", "flat_cover4"], "spot1", 50, 20);
    move("group_spot1", 250, room_height-50, 550, 0, 60, -40);
    
    
    copy("group_spot1", "group_spot2", true);
    move("group_spot2", 0, 0, -850, 0, -102, -10);
    
    copy("group_spot1", "group_spot3", true);
    move("group_spot3", -500, 0, -950, 0, -177, 5);
    
    build("block", -270, 51, 150, 60, 60, 80, "monitor1", "monitor", true);
    move("block_monitor1", 0, 0, 0, 0, -30, -10);
    build("block", -270, 51, -50, 60, 60, 80, "monitor2", "monitor", true);
    move("block_monitor2", 0, 0, 0, 0, 0, -10);
    
    build("block", -22, 42, 22, 6, 150, 6, "chair1", "chair");
    build("block", 22, 42, 22, 6, 150, 6, "chair2", "chair");
    build("block", 22, 42, -22, 6, 150, 6, "chair3", "chair");
    build("block", -22, 42, -22, 6, 150, 6, "chair4", "chair");
    build("block", 0, 102, -22, 38, 6, 6, "chair5", "chair");
    build("block", 0, 102, 22, 38, 6, 6, "chair6", "chair");
    build("block", 22, 102, 0, 38, 6, 6, "chair7", "chair");
    move("block_chair7", 0, 0, 0, 0, 90, 0);
    build("block", -22, 102, 0, 38, 6, 6, "chair8", "chair");
    move("block_chair8", 0, 0, 0, 0, 90, 0);
    build("block", 0, 191, 0, 60, 6, 60, "chair_top", "chair");
    
    dropshadow("block_chair1_1", -20, 41, 26, 0, 4, 200, -30, false);
    
    dropshadow("block_chair2_1", 24, 41, 26, 0, 4, 200, -30, false);
    
    dropshadow("block_chair3_1", 24, 41, -20, 0, 4, 200, -30, false);
    
    dropshadow("block_chair4_1", -20, 41, -20, 0, 4, 200, -30, false);
    
    group(["dropshadow_block_chair1_1", "dropshadow_block_chair2_1", "dropshadow_block_chair3_1", "dropshadow_block_chair4_1"], "dropshadows_chair1", 6, 1);
    copy("group_dropshadows_chair1", "group_dropshadows_chair2");
    copy("group_dropshadows_chair2", "group_dropshadows_chair3");
    move("group_dropshadows_chair2", 0, 0, -6, 0, 180, 0);
    move("group_dropshadows_chair3", 3, 0, 0, 0, 70, 0);
    move("dropshadow_block_chair4_1_copy_copy", 15, 0, 0, 0, 0, 0);
    move("dropshadow_block_chair2_1_copy_copy", -10, 0, 5, 0, 0, 0);
    move("dropshadow_block_chair3_1_copy_copy", 0, 0, 10, 0, 0, 0);
    group(["block_chair1", "block_chair2", "block_chair3", "block_chair4", "block_chair5", "block_chair6", "block_chair7", "block_chair8", "block_chair_top", "group_dropshadows_chair1", "group_dropshadows_chair2", "group_dropshadows_chair3"], "chair1", 50, 160);
    
    
    
    
    
    
    
    img(-12, 100, -1, 87, 200, "guitar_front", "img/guitar_front.png", undefined, true);
    move("img_guitar_front", 0, 0, 0, 0, -90, 0);
    img(9, 54, -1, 87, 107, "guitar_body_back", "img/guitar_body_back.png", undefined, true);
    move("img_guitar_body_back", 0, 0, 0, 0, -90, 0);
    img(-9, 153, 1, 23, 94, "guitar_neck_back", "img/guitar_neck_back.png", undefined, true);
    move("img_guitar_neck_back", 0, 0, 0, 0, 90, 0);
    img(0, 1, 0, 20, 6, "guitar_wall1", "img/guitar_wall_23.jpg", "guitar_wall", false);
    move("img_guitar_wall1", 0, 0, 0, 90, 0, 0);
    img(0, 1, -6, 20, 6, "guitar_wall2", "img/guitar_wall_22.jpg", "guitar_wall", false);
    
    move("img_guitar_wall2", 0, 0, 0, 93, 0, 0);
    img(0, 2, -12, 20, 8, "guitar_wall3", "img/guitar_wall_21.jpg", "guitar_wall", false);
    
    move("img_guitar_wall3", 0, 0, 0, 100, 0, 0);
    img(0, 5, -19, 20, 7, "guitar_wall4", "img/guitar_wall_20.jpg", "guitar_wall", false);
    move("img_guitar_wall4", 0, 0, 0, 110, 0, 0);
    img(0, 7, -24, 20, 7, "guitar_wall5", "img/guitar_wall_19.jpg", "guitar_wall", false);
    move("img_guitar_wall5", 0, 0, 0, 118, 0, 0);
    img(0, 9, -29, 20, 6, "guitar_wall6", "img/guitar_wall_18.jpg", "guitar_wall", false);
    move("img_guitar_wall6", 0, 0, 0, 127, 0, 0);
    img(0, 12, -33, 20, 6, "guitar_wall7", "img/guitar_wall_17.jpg", "guitar_wall", false);
    move("img_guitar_wall7", 0, 0, 0, 134, 0, 0);
    img(0, 16, -37, 20, 6, "guitar_wall8", "img/guitar_wall_16.jpg", "guitar_wall", false);
    move("img_guitar_wall8", 0, 0, 0, 142, 0, 0);
    img(0, 21, -40, 20, 6, "guitar_wall9", "img/guitar_wall_15.jpg", "guitar_wall", false);
    move("img_guitar_wall9", 0, 0, 0, 156, 0, 0);
    img(0, 27, -42, 20, 7, "guitar_wall10", "img/guitar_wall_14.jpg", "guitar_wall", false);
    move("img_guitar_wall10", 0, 0, 0, 161, 0, 0);
    img(0, 30, -43, 20, 4, "guitar_wall11", "img/guitar_wall_13.jpg", "guitar_wall", false);
    move("img_guitar_wall11", 0, 0, 0, 175, 0, 0);
    img(0, 35, -43, 20, 7, "guitar_wall12", "img/guitar_wall_12.jpg", "guitar_wall", false);
    
    img(0, 40, -43, 20, 3, "guitar_wall13", "img/guitar_wall_11.jpg", "guitar_wall", false);
    
    img(0, 45, -42, 20, 9, "guitar_wall14", "img/guitar_wall_10.jpg", "guitar_wall", false);
    move("img_guitar_wall14", 0, 0, 0, 14, 0, 0);
    img(0, 51, -40, 20, 5, "guitar_wall15", "img/guitar_wall_09.jpg", "guitar_wall", false);
    move("img_guitar_wall15", 0, 0, 0, 27, 0, 0);
    img(0, 55, -37, 20, 6, "guitar_wall16", "img/guitar_wall_08.jpg", "guitar_wall", false);
    move("img_guitar_wall16", 0, 0, 0, 35, 0, 0);
    
    img(0, 60, -33, 20, 8, "guitar_wall17", "img/guitar_wall_07.jpg", "guitar_wall", false);
    move("img_guitar_wall17", 0, 0, 0, 45, 0, 0);
    img(0, 64, -29, 20, 4, "guitar_wall18", "img/guitar_wall_06.jpg", "guitar_wall", false);
    move("img_guitar_wall18", 0, 0, 0, 45, 0, 0);
    img(0, 67, -27, 20, 3, "guitar_wall19", "img/guitar_wall_05.jpg", "guitar_wall", false);
    move("img_guitar_wall19", 0, 0, 0, 35, 0, 0);
    img(0, 69, -26, 20, 3, "guitar_wall20", "img/guitar_wall_04.jpg", "guitar_wall", false);
    move("img_guitar_wall20", 0, 0, 0, 20, 0, 0);
    img(0, 71, -25, 20, 4, "guitar_wall21", "img/guitar_wall_03.jpg", "guitar_wall", false);
    move("img_guitar_wall21", 0, 0, 0, 5, 0, 0);
    img(0, 74, -25, 20, 4, "guitar_wall22", "img/guitar_wall_02.jpg", "guitar_wall", false);
    move("img_guitar_wall22", 0, 0, 0, -10, 0, 0);
    img(0, 78, -27, 20, 6, "guitar_wall23", "img/guitar_wall_01.jpg", "guitar_wall", false);
    move("img_guitar_wall23", 0, 0, 0, -27, 0, 0);
    img(0, 84, -29, 20, 7, "guitar_wall24", "img/guitar_wall_02.jpg", "guitar_wall", false);
    move("img_guitar_wall24", 0, 0, 0, -18, 0, 0);
    img(0, 89, -30, 20, 5, "guitar_wall25", "img/guitar_wall_03.jpg", "guitar_wall", false);
    move("img_guitar_wall25", 0, 0, 0, -2, 0, 0);
    img(0, 93, -30, 20, 5, "guitar_wall26", "img/guitar_wall_04.jpg", "guitar_wall", false);
    move("img_guitar_wall26", 0, 0, 0, 15, 0, 0);
    img(0, 97, -29, 20, 5, "guitar_wall27", "img/guitar_wall_05.jpg", "guitar_wall", false);
    move("img_guitar_wall27", 0, 0, 0, 35, 0, 0);
    img(0, 100, -27, 20, 5, "guitar_wall28", "img/guitar_wall_06.jpg", "guitar_wall", false);
    move("img_guitar_wall28", 0, 0, 0, 45, 0, 0);
    img(0, 104, -22, 20, 9, "guitar_wall29", "img/guitar_wall_07.jpg", "guitar_wall", false);
    move("img_guitar_wall29", 0, 0, 0, 60, 0, 0);
    img(0, 105, -17, 20, 6, "guitar_wall30", "img/guitar_wall_08.jpg", "guitar_wall", false);
    move("img_guitar_wall30", 0, 0, 0, 75, 0, 0);
    img(0, 106, -11, 20, 8, "guitar_wall31", "img/guitar_wall_09.jpg", "guitar_wall", false);
    move("img_guitar_wall31", 0, 0, 0, 85, 0, 0);
    
    group(["img_guitar_wall1",
           "img_guitar_wall2",
           "img_guitar_wall3",
           "img_guitar_wall4",
           "img_guitar_wall5",
           "img_guitar_wall6",
           "img_guitar_wall7",
           "img_guitar_wall8",
           "img_guitar_wall9",
           "img_guitar_wall10",
           "img_guitar_wall11",
           "img_guitar_wall12",
           "img_guitar_wall13",
           "img_guitar_wall14",
           "img_guitar_wall15",
           "img_guitar_wall16",
           "img_guitar_wall17",
           "img_guitar_wall18",
           "img_guitar_wall19",
           "img_guitar_wall20",
           "img_guitar_wall21",
           "img_guitar_wall22",
           "img_guitar_wall23",
           "img_guitar_wall24",
           "img_guitar_wall25",
           "img_guitar_wall26",
           "img_guitar_wall27",
           "img_guitar_wall28",
           "img_guitar_wall29",
           "img_guitar_wall30",
           "img_guitar_wall31"], "guitar_wall_right", 20, 100);
    copy("group_guitar_wall_right", "group_guitar_wall_left");
    move("group_guitar_wall_right", 0, 0, -1, 0, 180, 0);
    move("img_guitar_wall25_copy", 0, -1, 0, 0, 0, 0);
    move("img_guitar_wall26_copy", 0, -1, 1, 20, 0, 0);
    move("img_guitar_wall27_copy", 0, -2, 3, 30, 0, 0);
    move("img_guitar_wall28_copy", 0, -4, 5, 45, 0, 0);
    move("img_guitar_wall29_copy", 0, -8, 6, 25, 0, 0);
    move("img_guitar_wall30_copy", 0, -8, 8, -20, 0, 0);
    move("img_guitar_wall31_copy", 0, -4, 5, -80, 0, 0);
    
    img(0, 106, 1, 20, 14, "guitar_wall32", "img/guitar_wall_10.jpg", "guitar_wall", false);
    move("img_guitar_wall32", 0, 0, 0, 90, 0, 0);
    
    group(["group_guitar_wall_right", "group_guitar_wall_left", "img_guitar_front", "img_guitar_body_back", "img_guitar_neck_back", "img_guitar_wall32"], "guitar", 20, 200);
    move("group_guitar", -55, 43, -20, 0, 20, 20);
    
    
    group(["block_stage_base", "group_microphone", "group_spot1", "group_spot2", "group_spot3", "block_monitor1", "block_monitor2", "group_chair1", "group_guitar"], "stage", 600, 40);
    move("group_stage", 650, 8, -350, 0, 0, 0);
    
    
    
    // ADJUST GUITAR SHADERS
    
    var guitar_shader_factor = 0.9;
    
    for(var s = 0; s < 18; s++) {
    document.getElementById("group_guitar_wall_right").childNodes[s].childNodes[1].style["background-color"] = "rgba(0, 0, 0, " + guitar_shader_factor + ")";
    guitar_shader_factor -= 0.045;
    }
    
    guitar_shader_factor = 0.1;
    for(var s = 18; s < 23; s++) {
    document.getElementById("group_guitar_wall_right").childNodes[s].childNodes[1].style["background-color"] = "rgba(0, 0, 0, " + guitar_shader_factor + ")";
    guitar_shader_factor += 0.1;
    }
    for(var s = 23; s < 31; s++) {
    document.getElementById("group_guitar_wall_right").childNodes[s].childNodes[1].style["background-color"] = "rgba(0, 0, 0, " + guitar_shader_factor + ")";
    guitar_shader_factor -= 0.08;
    }
    
    
    guitar_shader_factor = 0.9;
    for(var s = 0; s < 18; s++) {
    document.getElementById("group_guitar_wall_left").childNodes[s].childNodes[1].style["background-color"] = "rgba(0, 0, 0, " + guitar_shader_factor + ")";
    guitar_shader_factor -= 0.045;
    }
    
    guitar_shader_factor = 0.1;
    for(var s = 18; s < 23; s++) {
    document.getElementById("group_guitar_wall_left").childNodes[s].childNodes[1].style["background-color"] = "rgba(0, 0, 0, " + guitar_shader_factor + ")";
    guitar_shader_factor += 0.1;
    }
    
    for(var s = 23; s < 26; s++) {
    document.getElementById("group_guitar_wall_left").childNodes[s].childNodes[1].style["background-color"] = "rgba(0, 0, 0, " + guitar_shader_factor + ")";
    guitar_shader_factor -= 0.2;
    }
    
    // END ADJUST GUITAR SHADERS
    
    
    
    
     /*
    build("block", 0, 251, 0, 80, 80, 80, "lamp_cover");
    build("block", 5, 0, 0, 60, 10, 60, "lamp_base");
    build("block", 0, 11, 0, 6, 239, 6, "lamp_pipe");
    group(["block_lamp_cover", "block_lamp_base", "block_lamp_pipe"], "lamp", 80, 330);
    move("group_lamp", -350, 0, 860, 0, 0, 0);
    */
    
    
    
    // KAMIN
    
    build("block", 0, 0, 0, 400, 80, 200, "kamin_base", "kamin", false); // Textur: 800x160
    build("block", 0, 82, -15, 350, 300, 150, "kamin_middle", "kamin", false); // Textur: Front: 700x600, Seite: 300x600
    build("block", 0, 384, -10, 380, 10, 180, "kamin_top", "kamin", false); // Textur: 760x360
    group(["block_kamin_base", "block_kamin_middle", "block_kamin_top"], "kamin", 400, 480);
    move ("group_kamin", -750, 0, -750, 0, -45, 0);
    
    build("flat", 0, 0, 0, 312, 250, 0, "fire", "flat", true);
    move("flat_fire", -750, 210, -750, 0, -45, 0);
    
    
    
    
    
    
    
    
    
    
    
    // DROPSHADOWS
    
    dropshadow("tube_seat1", -350, 0, 540, -150, 96, 150, 0, true);
    
    
    /*dropshadow("group_couch1_4", -1003, 5, 860, 0, 260, 60, 0, false); //wall left 1
    dropshadow("group_couch1_5", -1001, 90, 955, 0, 60, 140, 0, false); //wall left 2
    move("dropshadow_group_couch1_4", 0, 3, 0, -90, 90, 0);
    move("dropshadow_group_couch1_5", 0, 3, 0, -80, 90, 0);*/
    
    dropshadow("group_couch2_1", -675, 0, 190, 180, 450, 180, -25, false); // base back
    dropshadow("group_couch2_2", -475, 76, 332, -90, 90, 10, 60, false); // rest r
    
    dropshadow("table2_leg_tr1", -525, 0, 580, 180, 10, 120, -50, false);
    dropshadow("table2_leg_tr2", -530, 0, 585, -90, 10, 143, 40, false);
    dropshadow("table2_leg_br1", -525, 0, 470, 180, 10, 100, -45, false);
    dropshadow("table2_leg_br2", -530, 0, 475, -90, 10, 170, 45, false);
    dropshadow("table2_leg_br3", -608, 0, 393, 0, 20, 60, 0, false);
    move("dropshadow_table2_leg_br3", 0, 11, 0, -90, 0, 0);
    dropshadow("table2_1", -800, 0, 360, 0, 300, 120, 0, false);
    dropshadow("table2_2", -785, 0, 393, 0, 285, 60, -35, false);
    move("dropshadow_table2_2", 0, 11, 0, -90, 0, 0);
    dropshadow("tube_cup", -602, 94, 557, -125, 20, 35, 0, true);
    dropshadow("tube_ashtray", -669, 96, 535, -120, 28, 25, 0, true);
    
    // dropshadow("lamp_base", -150, 0, 815, 0, 130, 130, 0, false);
    
    
    
    
    
    build("light", -150, 200, 880, 1, 1, 1900, "main");
    
    //document.getElementById("group_lamp_front").addEventListener("click", function() { animate_move("light_main", 1, "ease-in-out", 400, 0, 0, 0, 0, 0, true); animate_move("group_lamp_front", 1, "ease-in-out", 400, 0, 0, 0, 0, 0, true); });
    
    
   
    // PRÄSENTATION
    /*
    shaders_flat.forEach(element => {element[0].style.display = "none"; return;});
        shaders_block.forEach(element => {
            element[0].style.display = "none";
            element[1].style.display = "none";
            element[2].style.display = "none";
            element[3].style.display = "none";
            element[4].style.display = "none";
            element[5].style.display = "none";
            return;
            });
    
            dropshadows.forEach(element => { element.style.display = "none";}); zero_on = false;
            document.getElementById("group_dropshadows_chair1").style.display = "none";
            document.getElementById("group_dropshadows_chair2").style.display = "none";
            document.getElementById("group_dropshadows_chair3").style.display = "none";

    build("flat", -1008, 250, 0, 500, 490, 0, "future_content", "text", false);
    move("flat_future_content", 2010, 0, 0, 0, 270, 0);
    copy("flat_future_content", "flat_future_features");
    move("flat_future_features", 0, 0, -600, 0, 0, 0);
    document.getElementById("flat_future_content").innerHTML = "<h1>Future content</h1><ul><li>riddles</li><li>collectibles</li><li>easter eggs</li><li>unlockable areas</li></ul>";
    document.getElementById("flat_future_features").innerHTML = "<h1>Future features</h1><ul><li>multiple light sources</li><li>dynamic drop shadows</li><li>cross-browser</li><li>polygon models</li><li>directional sound</li><li>VR / motion control</li><li>backend + website builder</li></ul>";
    */
// PRÄSENTATION ENDE


    break;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    case "white":
    
        build("flat", 0, 0, 0, 200, 200, 0, "heading1", "heading");
        document.getElementById("flat_heading1").innerHTML ="<h1>Hello World</h1>";
    
            
        build("block", 300, 300, 400, 200, 200, 200, "heading1", "heading");
        document.getElementById("block_heading1").firstChild.innerHTML ="<h1>Hello World</h1>";
    
        document.getElementById("x_axis").style.display ="none";
        document.getElementById("y_axis").style.display ="none";
        document.getElementById("z_axis").style.display ="none";
    
    }
}