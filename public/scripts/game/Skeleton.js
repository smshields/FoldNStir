//Collects all bones of user into single addressable unit
//A single bone of a user. Has a start and end point (moving away from hips) for rendering and collision detection.

import GameObject from "../core/GameObject.js";
import GameSession from "../core/GameSession.js";
import Bone from "./Bone.js";

export default class Skeleton extends GameObject {

    constructor() {
        super(0, 0, 0, 0, 0, 0);
        //data for rendering skeleton
        this.__bones = [];
        //data for each landmark detected
        this.__joints = [];

        this.__leftTemple = {};
        this.__leftEyebrow1 = {};
        this.__leftEyebrow2 = {};
        this.__leftNoseBridge = {};
        this.__rightNoseBridge = {};
        this.__rightEyebrow2 = {};
        this.__rightEyebrow1 = {};
        this.__rightTemple = {};
        this.__mouth = {};	
        this.__leftFingertips = {};
        this.__leftInnerpalm = {};
        this.__leftOuterpalm = {};
        this.__leftThumb = {};
        this.__leftForearm = {};
        this.__leftUpperarm = {};
        this.__leftAbdominal = {};
        this.__leftThigh = {};
        this.__leftShin = {};
        this.__leftHeel = {};
        this.__leftFootTop = {};
        this.__leftFootBottom = {};
        this.__hips = {};
        this.__rightThigh = {};
        this.__rightShin = {};
        this.__rightHeel = {};
        this.__rightFootTop = {};
        this.__rightFootBottom = {};
        this.__rightAbdominal = {};
        this.__shoulders = {};
        this.__rightUpperarm = {};
        this.__rightForearm = {};
        this.__rightThumb = {};
        this.__rightInnerpalm = {};
        this.__rightOuterpalm = {};
        this.__rightFingertips = {};

        
    }

    //updates any model attributes of the bone
    update(){
        if(this.gameSession.instance){
            this.clearBones();
            //refresh skeleton with new set of bones
            //get updated pose landmarks from game session
            this.joints = this.gameSession.instance.poseLandmarks || {};
            //update list of bones with new point information
            this.addBonesFromPoseLandmarks(this.joints);
        }
    }

    //Adds bone to the canvas
    render(){
        for (let bone in this.bones){
            if(this.bones[bone]){
                this.p5.stroke(255);
                this.bones[bone].render();
            }
        }

    }

    get bones(){
        return this.__bones;
    }

    set bones(bones){
        this.__bones = bones;
    }

    get joints(){
        return this.__joints;
    }

    set joints(joints){
        this.__joints = joints;
    }

    addBone(bone){
        this.bones.push(bone);
    }

    clearBones(){
        this.bones = [];
    }

    //This is a big nasty method because we are hardcoding 
    //based on fig 4. https://google.github.io/mediapipe/solutions/pose#javascript-solution-api
    /** points are based on their position in the poseLandmarks array with the following objects:
     * 0. nose 
     * 1. left_eye_inner 
     * 2. left_eye
     * 3. left_eye_outer
     * 4. right_eye_inner
     * 5. right_eye
     * 6. right_eye_outer
     * 7. left_ear
     * 8. right_ear
     * 9. mouth_left
     * 10. mouth_right
     * 11. left_shoulder
     * 12. right_shoulder
     * 13. left_elbow
     * 14. right_elbow
     * 15. left_wrist
     * 16. right_wrist
     * 17. left_pinky
     * 18. right_pinky
     * 19. left_index
     * 20. right_index
     * 21. left_thumb
     * 22. right_thumb
     * 23. left_hip
     * 24. right_hip
     * 25. left_knee
     * 26. right_knee
     * 27. left_ankle
     * 28. right_ankle
     * 29. left_heel
     * 30. right_heel
     * 31. left_foot_index
     * 32. right_foot_index
     * 
     * These form the following "bones":
        0	left_temple	8	6
        1	left_eyebrow_1	6	5
        2	left_eyebrow_2	5	4
        3	left_nose_bridge	4	0
        4	right_nose_bridge	0	1
        5	right_eyebrow_2	1	2
        6	right_eyebrow_1	2	3
        7	right_temple	3	7
        8	mouth	10	9
        9	left_fingertips	18	20
        10	left_innerpalm	16	20
        11	left_outerpalm	16	18
        12	left_thumb	16	22
        13	left_forearm	16	14
        14	left_upperarm	14	12
        15	left_abdominal	12	24
        16	left_thigh	24	26
        17	left_shin	26	28
        18	left_heel	28	30
        19	left_foot_top	28	32
        20	left_foot_bottom	32	30
        21	hips	24	23
        22	right_thigh	23	25
        23	right_shin	25	27
        24	right_heel	27	29
        25	right_foot_top	27	31
        26	right_foot_bottom	29	31
        27	right_abdominal	23	11
        28	shoulders	12	11
        29	right_upperarm	11	13
        30	right_forearm	13	15
        31	right_thumb	15	21
        32	right_innerpalm	15	19
        33	right_outerpalm	15	17
        34	right_fingertips	17	19
     * 
     * @param {*} poseLandmarks 
     */

    addBonesFromPoseLandmarks(poseLandmarks){

        if(Object.keys(poseLandmarks).length > 0){
            //left temple creation
            this.leftTemple = new Bone(poseLandmarks[8], poseLandmarks[6], "Left Temple", 0);
            this.bones.push(this.leftTemple);

            //left eyebrow 1 creation
            this.leftEyebrow1 = new Bone(poseLandmarks[6], poseLandmarks[5], "Left Eyebrow 1", 1);
            this.bones.push(this.leftEyebrow1);

            //left eyebrow 2 creation
            this.leftEyebrow2 = new Bone(poseLandmarks[5], poseLandmarks[4], "Left Eyebrow 2", 2);
            this.bones.push(this.leftEyebrow2);

            //left nose bridge creation
            this.leftNoseBridge = new Bone(poseLandmarks[4], poseLandmarks[0], "Left Nose Bridge", 3);
            this.bones.push(this.leftNoseBridge);

            //right nose bridge creation
            this.rightNoseBridge = new Bone(poseLandmarks[0], poseLandmarks[1], "Right Nose Bridge", 4);
            this.bones.push(this.rightNoseBridge);

            //right eyebrow 2 creation
            this.rightEyebrow2 = new Bone(poseLandmarks[1], poseLandmarks[2], "Right Eyebrow 2", 5);
            this.bones.push(this.rightEyebrow2);

            //right eyebrow 1 creation
            this.rightEyebrow1 = new Bone(poseLandmarks[2], poseLandmarks[3], "Right Eyebrow 1", 6);
            this.bones.push(this.rightEyebrow1);

            //right temple creation
            this.rightTemple = new Bone(poseLandmarks[3], poseLandmarks[7], "Right Temple", 7);
            this.bones.push(this.rightTemple);

            //mouth creation
            this.mouth = new Bone(poseLandmarks[10], poseLandmarks[9], "Mouth", 8);
            this.bones.push(this.mouth);

            //left fingertips creation
            this.leftFingertips = new Bone(poseLandmarks[18], poseLandmarks[20], "Left Fingertips", 9);
            this.bones.push(this.leftFingertips);

            //left innerpalm creation
            this.leftInnerpalm = new Bone(poseLandmarks[16], poseLandmarks[20], "Left Innerpalm", 10);
            this.bones.push(this.leftInnerpalm);

            //left outerpalm creation
            this.leftOuterpalm = new Bone(poseLandmarks[16], poseLandmarks[18], "Left Outerpalm", 11);
            this.bones.push(this.leftOuterpalm);

            //left thumb creation
            this.leftThumb = new Bone(poseLandmarks[16], poseLandmarks[22], "Left Thumb", 12);
            this.bones.push(this.leftThumb);

            //left forearm creation
            this.leftForearm = new Bone(poseLandmarks[16], poseLandmarks[14], "Left Forearm", 13);
            this.bones.push(this.leftForearm);

            //left upperarm creation
            this.leftUpperarm = new Bone(poseLandmarks[14], poseLandmarks[12], "Left Upperarm", 14);
            this.bones.push(this.leftUpperarm);

            //left abdominal creation
            this.leftAbdominal = new Bone(poseLandmarks[12], poseLandmarks[24], "Left Abdominal", 15);
            this.bones.push(this.leftAbdominal);

            //left thigh creation
            this.leftThigh = new Bone(poseLandmarks[24], poseLandmarks[26], "Left Thigh", 16);
            this.bones.push(this.leftThigh);

            //left shin creation
            this.leftShin = new Bone(poseLandmarks[26], poseLandmarks[28], "Left Shin", 17);
            this.bones.push(this.leftShin);

            //left heel creation
            this.leftHeel = new Bone(poseLandmarks[28], poseLandmarks[30], "Left Heel", 18);
            this.bones.push(this.leftHeel);

            //left foot top creation
            this.leftFootTop = new Bone(poseLandmarks[28], poseLandmarks[32], "Left Foot Top", 19);
            this.bones.push(this.leftFootTop);

            //left foot bottom creation
            this.leftFootBottom = new Bone(poseLandmarks[32], poseLandmarks[30], "Left Foot Bottom", 20);
            this.bones.push(this.leftFootBottom);

            //hips creation
            this.hips = new Bone(poseLandmarks[24], poseLandmarks[23], "Hips", 21);
            this.bones.push(this.hips);

            //right thigh creation
            this.rightThigh = new Bone(poseLandmarks[23], poseLandmarks[25], "Right Thigh", 22);
            this.bones.push(this.rightThigh);

            //right shin creation
            this.rightShin = new Bone(poseLandmarks[25], poseLandmarks[27], "Right Shin", 23);
            this.bones.push(this.rightShin);

            //right heel creation
            this.rightHeel = new Bone(poseLandmarks[27], poseLandmarks[29], "Right Heel", 24);
            this.bones.push(this.rightHeel);

            //right foot top creation
            this.rightFootTop = new Bone(poseLandmarks[27], poseLandmarks[31], "Right Foot Top", 25);
            this.bones.push(this.rightFootTop);

            //right foot bottom creation
            this.rightFootBottom = new Bone(poseLandmarks[29], poseLandmarks[31], "Right Foot Bottom", 26);
            this.bones.push(this.rightFootBottom);

            //right abdominal creation
            this.rightAbdominal = new Bone(poseLandmarks[23], poseLandmarks[11], "Right Abdominal", 27);
            this.bones.push(this.rightAbdominal);

            //shoulders creation
            this.shoulders = new Bone(poseLandmarks[12], poseLandmarks[11], "Shoulders", 28);
            this.bones.push(this.shoulders);

            //right upperarm creation
            this.rightUpperarm = new Bone(poseLandmarks[11], poseLandmarks[13], "Right Upperarm", 29);
            this.bones.push(this.rightUpperarm);

            //right forearm creation
            this.rightForearm = new Bone(poseLandmarks[13], poseLandmarks[15], "Right Forearm", 30);
            this.bones.push(this.rightForearm);

            //right thumb creation
            this.rightThumb = new Bone(poseLandmarks[15], poseLandmarks[21], "Right Thumb", 31);
            this.bones.push(this.rightThumb);

            //right innerpalm creation
            this.rightInnerpalm = new Bone(poseLandmarks[15], poseLandmarks[19], "Right Innerpalm", 32);
            this.bones.push(this.rightInnerpalm);

            //right outerpalm creation
            this.rightOuterpalm = new Bone(poseLandmarks[15], poseLandmarks[17], "Right Outerpalm", 33);
            this.bones.push(this.rightOuterpalm);

            //right fingertips creation
            this.rightFingertips = new Bone(poseLandmarks[17], poseLandmarks[19], "Right Fingertips", 34);
            this.bones.push(this.rightFingertips);
        }
    }

    get leftTemple() {
        return this.__leftTemple;
    }

    get leftEyebrow1() {
        return this.__leftEyebrow1;
    }

    get leftEyebrow2() {
        return this.__leftEyebrow2;
    }

    get leftNoseBridge() {
        return this.__leftNoseBridge;
    }

    get rightNoseBridge() {
        return this.__rightNoseBridge;
    }

    get rightEyebrow2() {
        return this.__rightEyebrow2;
    }

    get rightEyebrow1() {
        return this.__rightEyebrow1;
    }

    get rightTemple() {
        return this.__rightTemple;
    }

    get mouth() {
        return this.__mouth;
    }	

    get leftFingertips() {
        return this.__leftFingertips;
    }

    get leftInnerpalm() {
        return this.__leftInnerpalm;
    }

    get leftOuterpalm() {
        return this.__leftOuterpalm;
    }

    get leftThumb() {
        return this.__leftThumb;
    }

    get leftForearm() {
        return this.__leftForearm;
    }

    get leftUpperarm() {
        return this.__leftUpperarm;
    }

    get leftAbdominal() {
        return this.__leftAbdominal;
    }

    get leftThigh() {
        return this.__leftThigh;
    }

    get leftShin() {
        return this.__leftShin;
    }

    get leftHeel() {
        return this.__leftHeel;
    }

    get leftFootTop() {
        return this.__leftFootTop;
    }

    get leftFootBottom() {
        return this.__leftFootBottom;
    }

    get hips() {
        return this.__hips;
    }

    get rightThigh() {
        return this.__rightThigh;
    }

    get rightShin() {
        return this.__rightShin;
    }

    get rightHeel() {
        return this.__rightHeel;
    }

    get rightFootTop() {
        return this.__rightFootTop;
    }

    get rightFootBottom() {
        return this.__rightFootBottom;
    }

    get rightAbdominal() {
        return this.__rightAbdominal;
    }

    get shoulders() {
        return this.__shoulders;
    }

    get rightUpperarm() {
        return this.__rightUpperArm;
    }

    get rightForearm() {
        return this.__rightForearm;
    }

    get rightThumb() {
        return this.__rightThumb;
    }

    get rightInnerpalm() {
        return this.__rightInnerPalm;
    }

    get rightOuterpalm() {
        return this.__rightOuterpalm;
    }

    get rightFingertips() {
        return this.__rightFingerTips;
    }






    //Bone Setters by Name
    set leftTemple(leftTemple) {
        this.__leftTemple = leftTemple;
    }

    set leftEyebrow1(leftEyebrow1) {
        this.__leftEyebrow1 = leftEyebrow1;
    }

    set leftEyebrow2(leftEyebrow2) {
        this.__leftEyebrow2 = leftEyebrow2;
    }

    set leftNoseBridge(leftNoseBridge) {
        this.__leftNoseBridge = leftNoseBridge;
    }

    set rightNoseBridge(rightNoseBridge) {
        this.__rightNoseBridge = rightNoseBridge;
    }

    set rightEyebrow2(rightEyebrow2) {
        this.__rightEyebrow2 = rightEyebrow2;
    }

    set rightEyebrow1(rightEyebrow1) {
        this.__rightEyebrow1 = rightEyebrow1;
    }

    set rightTemple(rightTemple) {
        this.__rightTemple = rightTemple;
    }

    set mouth(mouth) {
        this.__mouth = mouth;
    }	

    set leftFingertips(leftFingertips) {
        this.__leftFingertips = leftFingertips;
    }

    set leftInnerpalm(leftInnerPalm) {
        this.__leftInnerpalm = leftInnerPalm;
    }

    set leftOuterpalm(leftOuterpalm) {
        this.__leftOuterpalm = leftOuterpalm;
    }

    set leftThumb(leftThumb) {
        this.__leftThumb = leftThumb;
    }

    set leftForearm(leftForearm) {
        this.__leftForearm = leftForearm;
    }

    set leftUpperarm(leftUpperarm) {
        this.__leftUpperarm = leftUpperarm;
    }

    set leftAbdominal(leftAbdominal) {
        this.__leftAbdominal = leftAbdominal;
    }

    set leftThigh(leftThigh) {
        this.__leftThigh = leftThigh;
    }

    set leftShin(leftShin) {
        this.__leftShin = leftShin;
    }

    set leftHeel(leftHeel) {
        this.__leftHeel = leftHeel;
    }

    set leftFootTop(leftFootTop) {
        this.__leftFootTop = leftFootTop;
    }

    set leftFootBottom(leftFootBottom) {
        this.__leftFootBottom = leftFootBottom;
    }

    set hips(hips) {
        this.__hips = hips;
    }

    set rightThigh(rightThigh) {
        this.__rightThigh = rightThigh;
    }

    set rightShin(rightShin) {
        this.__rightShin = rightShin;
    }

    set rightHeel(rightHeel) {
        this.__rightHeel = rightHeel;
    }

    set rightFootTop(rightFootTop) {
        this.__rightFootTop = rightFootTop;
    }

    set rightFootBottom(rightFootBottom) {
        this.__rightFootBottom = rightFootBottom;
    }

    set rightAbdominal(rightAbdominal) {
        this.__rightAbdominal = rightAbdominal;
    }

    set shoulders(shoulders) {
        this.__shoulders = shoulders;
    }

    set rightUpperarm(rightUpperarm) {
        this.__rightUpperArm = rightUpperarm;
    }

    set rightForearm(rightForearm) {
        this.__rightForearm = rightForearm;
    }

    set rightThumb(rightThumb) {
        this.__rightThumb = rightThumb;
    }

    set rightInnerpalm(rightInnerPalm) {
        this.__rightInnerPalm = rightInnerPalm;
    }

    set rightOuterpalm(rightOuterpalm) {
        this.__rightOuterpalm = rightOuterpalm;
    }

    set rightFingertips(rightFingertips) {
        this.__rightFingerTips = rightFingertips;
    }

}