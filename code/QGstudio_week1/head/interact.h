/***************************************************************************************
 *	File Name				:	interact.h
 *	CopyRight				:	2019 QG Studio 
 *	SYSTEM					:   win10
 *	Create Data				:	2019.3.23
 *	Author/Corportation		:	muzhou
 *
 *
 *--------------------------------Revision History--------------------------------------
 *	No	version		Data			Revised By			Item			Description
 *
 *
 ***************************************************************************************/

/**************************************************************
*	Multi-Include-Prevent Section
**************************************************************/

#ifndef INTERACT_H_INCLUDED
#define INTERACT_H_INCLUDED

/**************************************************************
*	Macro Define Section
**************************************************************/

#define OVERFLOW -1

/**************************************************************
 *  Constant Define Section
 *************************************************************/

extern const char *statuGuide[], *featureGuide[], *errorGuide[];
extern const int featureNumber, errorCodeNumber, exitNumber, BIGINT;

/**************************************************************
*	Struct Define Section
**************************************************************/

// define element type
typedef int ElemType; 

// define status
typedef enum Status { 
	ERROR,
	SUCCESS, 
} Status;

typedef enum listStatus {
    LastState,
    ListUndefined,
    ListDefined,
    NodeAdded,
    NodeDeleted,
    ListReversed,
    NodeExist,
    NodeNotExist,
    WaitForData,
    UndefinedError,
} listStatus;

typedef enum errorType {
    Undefined,
    WrongCommand,
    WrongDataWhenInsert,
    MallocError,
    ListTooShort,
    WrongDataWhenDelete,
    WrongDataWhenRequest,
} errorType;

/**************************************************************
*	Prototype Declare Section
**************************************************************/

/*
 *  @name        : void PrintGuide(listStatus stat, int isDuList);
 *	@description : print guide text to std
 *	@param		 : stat. isDuList
 *	@return		 : None
 *  @notice      : None
 */
void PrintGuide(listStatus stat, int isDuList);

/*
 *  @name        : void PrintError(int errorCode, int last_num, int isDuList);
 *	@description : print error info to std
 *	@param		 : errorCode, last_num, isDuList
 *	@return		 : None
 *  @notice      : None
 */
void PrintError(errorType errorCode, int last_num, int isDuList);
 
/*
 *  @name        : int GetInteger(int *num, int *wrap)
 *	@description : get an integer from std and assign it to num
 *	@param		 : num, wrap
 *	@return		 : Status
 *  @notice      : None
 */
Status GetInteger(int *num, int *wrap);

 /**************************************************************
*	End-Multi-Include-Prevent Section
**************************************************************/
#endif 
