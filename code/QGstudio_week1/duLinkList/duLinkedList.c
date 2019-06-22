#include <stdio.h>
#include <stddef.h>
#include "../head/duLinkedList.h"

/**
 *  @name        : Status InitList_DuL(DuLinkedList *L)
 *	@description : initialize an empty linked list with only the head node
 *	@param		 : L(the head node)
 *	@return		 : Status
 *  @notice      : None
 */
Status InitList_DuL(DuLinkedList *L) {
	*L = (DuLNode*)malloc(sizeof(DuLNode));
    if(L == NULL) return ERROR;
    (*L)->next = NULL;
    (*L)->prior = NULL;
    return SUCCESS;
}

/**
 *  @name        : void DestroyList_DuL(DuLinkedList *L)
 *	@description : destroy a linked list
 *	@param		 : L(the head node)
 *	@return		 : status
 *  @notice      : None
 */
void DestroyList_DuL(DuLinkedList *L) {
    if((*L)->next != NULL){
        DuLNode *temp = (*L)->next;
        while(temp->next != NULL){
            free(temp);
            temp = temp->next;
        }
        free(temp);
    }
    if((*L)->prior != NULL){
        DuLNode *temp = (*L)->prior;
        while(temp->prior != NULL){
            free(temp);
            temp = temp->prior;
        }
        free(temp);
    }
    free(*L);
    *L = NULL;
}

/**
 *  @name        : Status InsertBeforeList_DuL(DuLNode *p, LNode *q)
 *	@description : insert node q before node p
 *	@param		 : p, q
 *	@return		 : status
 *  @notice      : None
 */
Status InsertBeforeList_DuL(DuLNode *p, DuLNode *q) {
	DuLNode *temp = p->prior;
    p->prior = q;
    q->next = p;
    q->prior = temp;
    temp->next = q;
    return SUCCESS;
}

/**
 *  @name        : Status InsertAfterList_DuL(DuLNode *p, DuLNode *q)
 *	@description : insert node q after node p
 *	@param		 : p, q
 *	@return		 : status
 *  @notice      : None
 */
Status InsertAfterList_DuL(DuLNode *p, DuLNode *q) {
	DuLNode *temp = p->next;
    p->next = q;
    q->prior = p;
    q->next = temp;
    temp->prior = q;
    return SUCCESS;
}

/**
 *  @name        : Status DeleteList_DuL(DuLNode *p, ElemType *e)
 *	@description : delete the first node after the node p and assign its value to e
 *	@param		 : p, e
 *	@return		 : status
 *  @notice      : None
 */
Status DeleteList_DuL(DuLNode *p, ElemType *e) {
	if(p == NULL || p->next == NULL)return ERROR;
    DuLNode *temp = p->next;
    p->next = temp->next;
    if(temp->next != NULL)
        (temp->next)->prior = p;
    *e = temp->data;
    free(temp);
    return SUCCESS;
}
 
/**
 *  @name        : void TraverseList_DuL(DuLinkedList L, void (*visit)(ElemType e))
 *	@description : traverse the linked list and call the funtion visit
 *	@param		 : L(the head node), visit 
 *	@return		 : Status
 *  @notice      : None
 */
void TraverseList_DuL(DuLinkedList L, void (*visit)(ElemType e)) {
    DuLNode *temp = L;
    while(temp->prior != NULL) temp = temp->prior;
    while(temp != NULL){
        visit(temp->data);
        temp = temp->next;
    }
}

