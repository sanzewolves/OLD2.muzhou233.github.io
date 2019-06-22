#include <stdio.h>
#include <stdlib.h>
#include <stddef.h>
#include "./head/linkedList.h"
#include "./head/duLinkedList.h"
#include "./head/interact.h"

void printElem(ElemType data){//ready for TraverseList
    printf("%d ",data);
}

int main()
{
    LinkedList list = NULL;
    DuLinkedList dulist = NULL;
    int num = 0, last_num = BIGINT, isDuList = 0, wrap, keepRun = 1;
    PrintGuide(ListUndefined, isDuList);

    while(keepRun){
        //get command
        while(GetInteger(&num, &wrap) == ERROR || (list == NULL && num != 1 && num != exitNumber) || num < 1 || num > featureNumber)
            PrintError(WrongCommand, 0, isDuList);
        
        last_num = BIGINT;
        if(num == exitNumber)keepRun = 0;
        else if(list == NULL){ //InitList
            if(InitList(&list) == ERROR)
                PrintError(MallocError, 0, isDuList);
            else PrintGuide(ListDefined, isDuList);
        }
        else switch(num){
            case 1: //InsertNode
                PrintGuide(WaitForData, isDuList);
                wrap = 0;
                while(!wrap){
                    while(GetInteger(&num, &wrap) == ERROR)
                        PrintError(WrongDataWhenInsert, last_num, isDuList);
                    if(InsertList(list, newNode(num)) == ERROR){
                        PrintError(Undefined, 0, isDuList);
                        wrap = 0;
                        break;
                    }
                    last_num = num;
                }
                if(wrap == 1)PrintGuide(NodeAdded, isDuList);
                break;

            case 2: //DeleteNode
                PrintGuide(WaitForData, isDuList);
                wrap = 0;
                while(!wrap){
                    while(GetInteger(&num, &wrap) == ERROR)
                        PrintError(WrongDataWhenDelete, last_num, isDuList);
                    if(DeleteList(SearchList(list, num), &num) == ERROR){
                        PrintGuide(NodeNotExist, isDuList);
                        wrap = 0;
                        break;
                    }
                    last_num = num;
                }
                if(wrap == 1)PrintGuide(NodeDeleted, isDuList);
                break;

            case 3: //CountList
                PrintGuide(ListDefined, isDuList);
                printf("链表中一共有%d个数据\n",CountList(list));
                break;

            case 4: //FindData
                PrintGuide(WaitForData, isDuList);
                while(GetInteger(&num, &wrap) == ERROR)
                    PrintError(WrongDataWhenRequest, last_num, isDuList);
                if(SearchList(list, num) == NULL)
                    PrintGuide(NodeNotExist, isDuList);
                else PrintGuide(NodeExist, isDuList);
                break;

            case 5: //WatchList
                PrintGuide(ListDefined, isDuList);
                printf("链表中的数据为：");
                TraverseList(list, printElem);
                putchar('\n');
                break;

            case 6: //ReverseList
                if(ReverseList(&list) == SUCCESS)
                    PrintGuide(ListReversed, isDuList);
                else PrintError(ListTooShort, 0, isDuList);
				break;

            case 7: //ReverseEvenList
                if(ReverseEvenList(&list) == SUCCESS)
                    PrintGuide(ListReversed, isDuList);
                else PrintError(ListTooShort, 0, isDuList);
                break;

            case 8: //DeleteList
                DestroyList(&list);
                PrintGuide(ListUndefined, isDuList);
                break;
        }
    }
    return 0;
}
