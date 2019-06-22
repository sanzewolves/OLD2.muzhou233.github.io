#include <stdlib.h>
#include <stdio.h>
#include "../head/interact.h"

const char *statuGuide[] = {
    "\n\
    ===================================================\n", "\
        请输入数字来执行相应的操作，一行连续输入数字       \n\
        将会按顺序执行。  当前状态为：\n                 ", "\
    			链表未创建    \n\n", "\
    			链表已创建    \n\n", "\
    			数据已插入    \n\n", "\
    			数据已删除    \n\n", "\
    			列表已反转    \n\n", "\
    			给定值存在    \n\n", "\
    			给定值不存在  \n\n", "\
    			等待输入数据  \n\n", "\
    			出现未知错误  \n\n"
}, *featureGuide[] = {
    "\
        1. 建立链表             \n", "\
        2. 建立双链表(接口未完成，无法使用)     \n", "\
        1. 插入数据             \n", "\
        2. 删除指定数据         \n", "\
        3. 统计链表中数据量     \n", "\
        4. 查找给定值是否存在   \n", "\
        5. 查看链表中的数据     \n", "\
        6. 反转链表             \n", "\
        7. 反转链表偶数项       \n", "\
        8. 删除整个链表         \n", "\
        1. 在前面插入数据       \n", "\
        2. 在后面插入数据       \n", "\
        3. 查看链表中的数据     \n", "\
        4. 删除整个链表         \n", "\
        9. 退出程序             \n"
}, *errorGuide[] = {
    "\
        错误：未分类的错误                        \n", "\
        错误：请正确输入数字                      \n", "\
        错误：请正确输入数据，数据不能超过九位数    \n\
            错误处之前的数据已被插入                 ", "\
        错误：申请内存失败                        \n", "\
        错误：链表长度不足无法反转                 \n", "\
        错误：给定值不存在，请检查链表内容          \n\
            错误处之前的数据已被删除                 ", "\
        错误：请正确输入数据，数据不能超过九位数    \n"
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
            没有数据被正确处理\n");
        else printf("\
            最后一个正确处理的数据为%d\n\n",last_num);
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
