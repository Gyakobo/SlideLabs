let DragResizer = function(){
  this.element = null
  this.actions = null

  this.current_action = null

  this.on_width_change = null
  this.constrain_width = null
  this.constrain_height = null

  this.enable_cursor_styling = false

  this.x0 = 0
  this.y0 = 0

  this.start_x = 0
  this.start_y = 0
  this.start_mouse_x = 0
  this.start_mouse_y = 0

  this.cx = 0
  this.cy = 0
  this.start_angle = 0
  this.start_mouse_angle = 0

  this.start_width = 0
  this.start_height = 0
}
DragResizer.prototype.set_element = function (element) {
  this.element = element
}
DragResizer.prototype.read_offsets_from_element = function (element) {
  let rect = element.getBoundingClientRect()
  this.x0 = rect.left
  this.y0 = rect.top
}

const all_actions_enabled = ['top', 'bottom', 'left', 'right', 'drag', 'rotate']
DragResizer.prototype.set_actions = function (actions=all_actions_enabled) {
  this.actions = actions
}
DragResizer.prototype.set_on_width_change_callback = function (func) {
  this.on_width_change = func
}

DragResizer.prototype.set_enable_cursor_styling = function (is_enable) {
  this.enable_cursor_styling = is_enable
}

let constrain = function (v, v_min, v_max){
  return Math.max(v_min, Math.min(v_max, v))
}
DragResizer.prototype.read_constraints_from_style = function () {
  let style = this.element.style

  if (style.minWidth !== '' || style.maxWidth !== '' || style.minHeight !== '' || style.maxHeight !== ''){
    this.min_width = (style.minWidth !== '') ? parseFloat(style.minWidth) : 0
    this.max_width = (style.maxWidth !== '') ? parseFloat(style.maxWidth) : Infinity
    this.min_height = (style.minHeight !== '') ? parseFloat(style.minHeight) : 0
    this.max_height = (style.maxHeight !== '') ? parseFloat(style.maxHeight) : Infinity

    this.constrain_width = function (width) {
      return constrain(width, this.min_width, this.max_width)
    }
    this.constrain_height = function (height) {
      constrain(height, this.min_height, this.max_height)
    }
  }
}

DragResizer.prototype.style_cursor = function (action){
  if (action === null){
    this.element.style.cursor = 'default'
  }
  else if (action === 'drag'){
    this.element.style.cursor = 'move'
  }
  else if (action === 'top'){
    this.element.style.cursor = 'n-resize'
  }
  else if (action === 'bottom'){
    this.element.style.cursor = 's-resize'
  }
  else if (action === 'left'){
    this.element.style.cursor = 'w-resize'
  }
  else if (action === 'right'){
    this.element.style.cursor = 'e-resize'
  }
  else if (action === 'lt'){
    this.element.style.cursor = 'nw-resize'
  }
  else if (action === 'lb'){
    this.element.style.cursor = 'sw-resize'
  }
  else if (action === 'rt'){
    this.element.style.cursor = 'ne-resize'
  }
  else if (action === 'rb'){
    this.element.style.cursor = 'se-resize'
  }
  else if (action === 'rotate'){
    this.element.style.cursor = 'wait' //todo add appropriate cursor styling!!
  }
}

DragResizer.prototype.detect_action = function (x, y, rect) {
  let is_top = this.actions.includes('top') && Math.abs(y - rect.top) < 6
  let is_bottom = this.actions.includes('bottom') && Math.abs(y - rect.bottom) < 6
  let is_left = this.actions.includes('left') && Math.abs(x - rect.left) < 6
  let is_right = this.actions.includes('right') && Math.abs(x - rect.right) < 6

  if (is_left){
    if (is_top){
      return 'lt'
    } else if (is_bottom){
      return 'lb'
    } else{
      return 'left'
    }
  }else if (is_right){
    if (is_top){
      return 'rt'
    } else if (is_bottom){
      return 'rb'
    } else{
      return 'right'
    }
  }else if (is_top){
    return 'top'
  }else if (is_bottom){
    return 'bottom'
  }

  let is_inside = x >= rect.left && x < rect.right && y >= rect.top && y < rect.bottom
  if (is_inside){
    if (this.actions.includes('drag')){
      return 'drag'
    }
  }else {
    if (this.actions.includes('rotate')){
      let cx = (rect.right - rect.left) / 2
      let cy = (rect.bottom - rect.top) / 2

      let offset_x = Math.abs(x - cx)
      let offset_y = Math.abs(y - cy)

      let w_half = rect.width / 2
      let h_half = rect.height / 2
      let is_rotate = offset_x > (w_half + 3) && offset_x < (w_half + 10) &&
        offset_y > (h_half + 3) && offset_y < (h_half + 10)

      if (is_rotate){
        return 'rotate'
      }
    }
  }

  return null
}

DragResizer.prototype.mousedown_listener = function (event) {
  if (event.which !== 1 || this.element === null){
    return
  }

  let x = event.pageX - this.cx
  let y = event.pageY - this.cy
  let rect = this.element.getBoundingClientRect()

  this.action = this.detect_action(x,y,rect)

  if (this.action === null){
    return
  }

  this.start_mouse_x = x
  this.start_mouse_y = y


  if (this.action === 'drag'){
    this.start_x = rect.left
    this.start_y = rect.top
    this.start_mouse_x = x
    this.start_mouse_y = y
  }
  else if (this.action === 'rotate'){
    this.cx = (rect.right - rect.left) / 2
    this.cy = (rect.bottom - rect.top) / 2

    let dx = x - this.cx
    let dy = y - this.cy

    this.start_angle = 0
    this.start_mouse_angle = Math.atan2(dy, dx)
  }
  else{
    this.start_width = rect.width
    this.start_height = rect.height
    this.start_mouse_x = x
    this.start_mouse_y = y
  }
}
DragResizer.prototype.mouseup_listener = function (event) {
  if (event.which !== 1){
    return
  }
  this.action = null
}
DragResizer.prototype.mousemove_listener = function (event) {
  if(this.element === null){
    return
  }
  if (this.enable_cursor_styling){
    let action = this.detect_action()
    this.style_cursor(action)
  }

  if (this.action === null){
    return
  }
  if (event.which !== 1){
    this.action = null
    return
  }

  let x = event.pageX - this.cx
  let y = event.pageY - this.cy

  let dx = x - this.start_mouse_x
  let dy = y - this.start_mouse_y

  if (this.action === 'drag'){
    this.element.style.left = this.start_x + dx
    this.element.style.top = this.start_y + dy
  }
  else if(this.action === 'rotate'){
    let dx = x - this.cx
    let dy = y - this.cy
    let angle = Math.atan2(dy, dx)
    let dangle = angle - this.start_angle
    let dangle_deg = dangle / Math.PI * 180
    this.element.style.transform = 'rotate('+dangle_deg+'deg)'
  }
  else{
    let width = this.start_width
    let height = this.start_height

    if (['left','lt', 'lb'].includes(this.action)){
      width -= dx
    } else if (['right','rt', 'rb'].includes(this.action)){
      width += dx
    }

    if (['top','lt', 'rt'].includes(this.action)){
      height -= dy
    } else if (['bottom','lb', 'rb'].includes(this.action)){
      height += dy
    }

    if (this.constrain_width !== null){
      width = this.constrain_width(width)
    }
    if (this.constrain_height !== null){
      height = this.constrain_height(height)
    }

    this.element.style.width = width + 'px'
    this.element.style.height = height + 'px'

    if(this.on_width_change !== null){
      this.on_width_change(width)
    }
  }

}
DragResizer.prototype.add_listeners = function () {
  this.mdl = (event) => {this.mousedown_listener(event)}
  this.mul = (event) => {this.mouseup_listener(event)}
  this.mml = (event) => {this.mousemove_listener(event)}

  document.addEventListener('mousedown', this.mdl)
  document.addEventListener('mouseup', this.mul)
  document.addEventListener('mousemove', this.mml)
}
DragResizer.prototype.remove_listeners = function () {
  document.removeEventListener('mousedown', this.mdl)
  document.removeEventListener('mouseup', this.mul)
  document.removeEventListener('mousemove', this.mml)
}

export default {
  DragResizer:DragResizer
}