#include <stdlib.h>
#include <stdio.h>
#include <stddef.h>
#include "../head/linkedList.h"

/**
 *  @name        : LNode* newNode(ElemType data);
 *	@description : create a new node
 *	@param		 : data
 *	@return		 : LNode*
 *  @notice      : None
 */
LNode* newNode(ElemType data) {
    LNode *temp = (LNode*)malloc(sizeof(LNode));
    temp->data = data;
    temp->next = NULL;
    return temp;
}

/**
 *  @name        : Status InitList(LinkList *L);
 *	@description : initialize an empty linked list with only the head node without value
 *	@param		 : L(the head node)
 *	@return		 : Status
 *  @notice      : None
 */
Status InitList(LinkedList *L) {
	*L = (LNode*)malloc(sizeof(LNode));
    if(L == NULL) return ERROR;
    (*L)->next = NULL;
    return SUCCESS;
}

/**
 *  @name        : void DestroyList(LinkedList *L)
 *	@description : destroy a linked list, free all the nodes
 *	@param		 : L(the head node)
 *	@return		 : None
 *  @notice      : None
 */
void DestroyList(LinkedList *L) {
	LNode *temp1 = *L;
    LNode *temp2 = temp1->next;
    while(temp2 != NULL){
        free(temp1);
        temp1 = temp2;
        temp2 = temp1->next;
    }
    free(temp1);
    *L = NULL;
}

/**
 *  @name        : Status InsertList(LNode *p, LNode *q)
 *	@description : insert node q after node p
 *	@param		 : p, q
 *	@return		 : Status
 *  @notice      : None
 */
Status InsertList(LNode *p, LNode *q) {
	LNode *temp = p->next;
    p->next = q;
    q->next = temp;
    return SUCCESS;
}
/**
 *  @name        : Status DeleteList(LNode *p, ElemType *e)
 *	@description : delete the first node after the node p and assign its value to e
 *	@param		 : p, e
 *	@return		 : Status
 *  @notice      : None
 */
Status DeleteList(LNode *p, ElemType *e) {
    if(p == NULL || p->next == NULL)return ERROR;
	LNode *temp = p->next;
    p->next = temp->next;
    *e = temp->data;
    free(temp);
    return SUCCESS;
}

/**
 *  @name        : void TraverseList(LinkedList L, void (*visit)(ElemType e))
 *	@description : traverse the linked list and call the funtion visit
 *	@param		 : L(the head node), visit 
 *	@return		 : None
 *  @notice      : None
 */
void TraverseList(LinkedList L, void (*visit)(ElemType e)) {
	LNode *temp = L->next;
    while(temp != NULL){
        visit(temp->data);
        temp = temp->next;
    }
}

/**
 *  @name        : int CountList(LinkedList L);
 *	@description : count the data num
 *	@param		 : L(the head node)
 *	@return		 : int
 *  @notice      : None
 */
int CountList(LinkedList L) {
    int res = 0;
	LNode *temp = L->next;
    while(temp != NULL){
        res++;
        temp = temp->next;
    }
    return res;
}

/**
 *  @name        : Status SearchList(LinkedList L, ElemType e)
 *	@description : find the first node in the linked list according to e 
 *	@param		 : L(the head node), e
 *	@return		 : LNode(the node whose value is e)
 *  @notice      : None
 */
LNode* SearchList(LinkedList L, ElemType e) {
    if(CountList(L) == 0) return NULL;
	LNode *temp = L->next, *last = L;
    while(temp->data != e && temp->next != NULL){
        last = temp;
        temp = temp->next;
    }
    if(temp->data == e)return last;
    else return NULL;
} 

/**
 *  @name        : Status ReverseList(LinkedList *L)
 *	@description : reverse the linked list 
 *	@param		 : L(the head node)
 *	@return		 : Status
 *  @notice      : None
 */
Status ReverseList(LinkedList *L) {
    if(CountList(*L) == 0) return ERROR;
	LNode *temp1 = *L;
    LNode *temp2 = temp1->next;
    LNode *temp3 = temp2->next;
    while(temp3 != NULL){
        temp2->next = temp1;
        temp1 = temp2;
        temp2 = temp3;
        temp3 = temp3->next;
    }
    temp2->next = temp1;
    ((*L)->next)->next = NULL;
    (*L)->next = temp2;
    return SUCCESS;
}

/**
 *  @name        : Status IsLoopList(LinkedList L)
 *	@description : judge whether the linked list is looped
 *	@param		 : L(the head node)
 *	@return		 : Status
 *  @notice      : None
 */
Status IsLoopList(LinkedList L) {
	LNode *temp1 = L, *temp2 = L->next;
    while(temp1 != temp2 && temp2 != NULL && temp2->next != NULL){
        temp1 = temp1->next;
        temp2 = (temp2->next)->next;
    }
    if(temp1 != temp2 && temp2 == NULL)return SUCCESS;
    else return ERROR;
}

/**
 *  @name        : LNode* ReverseEvenList(LinkedList *L)
 *	@description : reverse the nodes which value is an even number in the linked list, input: 1 -> 2 -> 3 -> 4  output: 2 -> 1 -> 4 -> 3
 *	@param		 : L(the head node)
 *	@return		 : LNode(the new head node)
 *  @notice      : choose to finish 
 */
Status ReverseEvenList(LinkedList *L) {
    if(CountList(*L) < 2) return ERROR;
	LNode *temp1 = *L;
    LNode *temp2 = temp1->next;
    LNode *temp3 = temp2->next;
    LNode *temp4 = temp3->next;
    while(temp4 != NULL){
        temp1->next = temp3;
        temp2->next = temp4;
        temp3->next = temp2;
        if(temp4->next == NULL)break;
        temp1 = temp2;
        temp2 = temp1->next;
        temp3 = temp2->next;
        temp4 = temp3->next;
    }
    temp1->next = temp3;
    temp2->next = temp4;
    temp3->next = temp2;
    return SUCCESS;
}

/**
 *  @name        : LNode* FindMidNode(LinkedList *L)
 *	@description : find the middle node in the linked list
 *	@param		 : L(the head node)
 *	@return		 : LNode
 *  @notice      : choose to finish 
 */
LNode* FindMidNode(LinkedList *L) {
    if(IsLoopList(*L) == ERROR)return NULL;
	LNode *temp1 = *L, *temp2 = *L;
    while(temp2 != NULL && temp2->next != NULL){
        temp1 = temp1->next;
        temp2 = (temp2->next)->next;
    }
    return temp1;
}
