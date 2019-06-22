#include <stdlib.h>
#include <stdio.h>
#include "../head/interact.h"

const char *statuGuide[] = {
    "\n\
    ===================================================\n", "\
        ������������ִ����Ӧ�Ĳ�����һ��������������       \n\
        ���ᰴ˳��ִ�С�  ��ǰ״̬Ϊ��\n                 ", "\
    			����δ����    \n\n", "\
    			�����Ѵ���    \n\n", "\
    			�����Ѳ���    \n\n", "\
    			������ɾ��    \n\n", "\
    			�б��ѷ�ת    \n\n", "\
    			����ֵ����    \n\n", "\
    			����ֵ������  \n\n", "\
    			�ȴ���������  \n\n", "\
    			����δ֪����  \n\n"
}, *featureGuide[] = {
    "\
        1. ��������             \n", "\
        2. ����˫����(�ӿ�δ��ɣ��޷�ʹ��)     \n", "\
        1. ��������             \n", "\
        2. ɾ��ָ������         \n", "\
        3. ͳ��������������     \n", "\
        4. ���Ҹ���ֵ�Ƿ����   \n", "\
        5. �鿴�����е�����     \n", "\
        6. ��ת����             \n", "\
        7. ��ת����ż����       \n", "\
        8. ɾ����������         \n", "\
        1. ��ǰ���������       \n", "\
        2. �ں����������       \n", "\
        3. �鿴�����е�����     \n", "\
        4. ɾ����������         \n", "\
        9. �˳�����             \n"
}, *errorGuide[] = {
    "\
        ����δ����Ĵ���                        \n", "\
        ��������ȷ��������                      \n", "\
        ��������ȷ�������ݣ����ݲ��ܳ�����λ��    \n\
            ����֮ǰ�������ѱ�����                 ", "\
        ���������ڴ�ʧ��                        \n", "\
        ���������Ȳ����޷���ת                 \n", "\
        ���󣺸���ֵ�����ڣ�������������          \n\
            ����֮ǰ�������ѱ�ɾ��                 ", "\
        ��������ȷ�������ݣ����ݲ��ܳ�����λ��    \n"
};
const int initFeatureNumber = 2, listFeatureNumber = 8;
const int featureNumber = 15, errorCodeNumber = 6, exitNumber = 9;
const int BIGINT = 1000000000;

/*
 *  @name        : void PrintGuide(listStatus stat, int isDuList);
 *	@description : print guide text to std
 *	@param		 : stat, isDuList
 *	@return		 : None
 *  @notice      : None
 */
void PrintGuide(listStatus stat, int isDuList) {
    static listStatus lastStat = LastState;
    if(stat == LastState) stat = lastStat;
    else lastStat = stat;

    system("cls");
    puts(statuGuide[0]);
    printf("%s",statuGuide[1]);
    puts(statuGuide[stat+1]);
    if(stat == ListUndefined){
        puts(featureGuide[0]);
        puts(featureGuide[1]);
        puts(featureGuide[featureNumber-1]);
    }else if(stat == WaitForData);
    else{
        for(int i = initFeatureNumber; i < initFeatureNumber+listFeatureNumber; ++i)
            puts(featureGuide[i]);
        puts(featureGuide[featureNumber-1]);
    }
    puts(statuGuide[0]);
}

/*
 *  @name        : void PrintError(int errorCode, int last_num, int isDuList);
 *	@description : print error info to std
 *	@param		 : errorCode, last_num, isDuList
 *	@return		 : None
 *  @notice      : None
 */
void PrintError(errorType errorCode, int last_num, int isDuList) {
    if(errorCode < 0 || errorCode > errorCodeNumber)
        errorCode = Undefined;
    if(errorCode == Undefined) PrintGuide(UndefinedError, isDuList);
    else PrintGuide(LastState, isDuList);
    puts(errorGuide[errorCode]);
    if(errorCode == WrongDataWhenInsert || errorCode == WrongDataWhenDelete){
        if(last_num == BIGINT)puts("\
            û�����ݱ���ȷ����\n");
        else printf("\
            ���һ����ȷ���������Ϊ%d\n\n",last_num);
    }
}

/*
 *  @name        : int GetInteger(int *num, int *wrap)
 *	@description : get an integer from std and assign it to num
 *	@param		 : num, wrap
 *	@return		 : Status
 *  @notice      : None
 */
Status GetInteger(int *num, int *wrap){
    char temp = 0;
    *wrap = 0;
    scanf("%9d",num);
    temp = getchar();
    if(temp == ' ' || temp == '\n'){
        if(temp == '\n') *wrap = 1;
        return SUCCESS;
    }else {
        while(temp != '\n')
            temp = getchar();
        *wrap = 1;
        *num = 0;
        return ERROR;
    }
}
