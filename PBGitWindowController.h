//
//  PBDetailController.h
//  GitX
//
//  Created by Pieter de Bie on 16-06-08.
//  Copyright 2008 __MyCompanyName__. All rights reserved.
//

#import <Cocoa/Cocoa.h>
#import "PBGitRepository.h"

#define kGitSplitViewMinWidth 150.0f
#define kGitSplitViewMaxWidth 300.0f

@class PBViewController, PBGitSidebarController, PBGitCommitController;

@interface PBGitWindowController : NSWindowController <NSWindowDelegate>{
	__weak PBGitRepository* repository;

	PBViewController *contentController;

	PBGitSidebarController *sidebarController;
	IBOutlet NSView *sourceListControlsView;
	IBOutlet NSSplitView *splitView;
	IBOutlet NSView *sourceSplitView;
	IBOutlet NSView *contentSplitView;

	IBOutlet NSTextField *statusField;
	IBOutlet NSProgressIndicator *progressIndicator;

	IBOutlet NSToolbarItem *terminalItem;
	IBOutlet NSToolbarItem *finderItem;
}

@property (assign) __weak PBGitRepository *repository;

- (id)initWithRepository:(PBGitRepository*)theRepository displayDefault:(BOOL)display;

- (void)changeContentController:(PBViewController *)controller;

- (void)showCommitHookFailedSheet:(NSString *)messageText infoText:(NSString *)infoText commitController:(PBGitCommitController *)controller;
- (void)showMessageSheet:(NSString *)messageText infoText:(NSString *)infoText;
- (void)showErrorSheet:(NSError *)error;
- (void)showErrorSheetTitle:(NSString *)title message:(NSString *)message arguments:(NSArray *)arguments output:(NSString *)output;
- (void)collapseSplitView:(NSSplitView *)sp show:(BOOL)show;

- (IBAction) showCommitView:(id)sender;
- (IBAction) showHistoryView:(id)sender;
- (IBAction) revealInFinder:(id)sender;
- (IBAction) openInTerminal:(id)sender;
- (IBAction) cloneTo:(id)sender;
- (IBAction) refresh:(id)sender;
- (IBAction) changeLayout:(id)sender;

- (void)setHistorySearch:(NSString *)searchString mode:(NSInteger)mode;

@end
